"use client";

import { useEffect, useState } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const QrCodeScanner = () => {
  const [decodedText, setDecodedText] = useState<string | null>(null);
  const [strainInfo, setStrainInfo] = useState<{ strainId: string, quantity: number, category: string, grower: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const newScanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    newScanner.render(
      (decodedText, decodedResult) => {
        // Process the decoded result (for example, fetch item details)
        console.log("Decoded text: ", decodedText);
        setDecodedText(decodedText);

        // Parse the URL to extract query parameters
        const url = new URL(decodedText);
        const strainId = url.pathname.split('/').pop();
        const quantity = parseInt(url.searchParams.get('quantity') || '0', 10);
        const category = url.searchParams.get('category') || '';
        const grower = url.searchParams.get('grower') || '';

        setStrainInfo({ 
          strainId: strainId || '', 
          quantity, 
          category: category || '', 
          grower: grower || '' 
        });
        setIsModalOpen(true); // Open the modal when QR code is scanned
      },
      (error) => {
        console.warn(`QR Code no match: ${error}`);
      }
    );

    setScanner(newScanner);

    return () => {
      newScanner.clear().catch(error => console.error("Failed to clear scanner: ", error));
    };
  }, []);

  const stopScanning = () => {
    if (scanner) {
      scanner.clear().then(() => {
        console.log("Scanner stopped.");
      }).catch(error => console.error("Failed to stop scanner: ", error));
    }
  };

  const reinitializeScanner = () => {
    if (scanner) {
      scanner.clear().then(() => {
        const newScanner = new Html5QrcodeScanner(
          "qr-reader",
          { fps: 10, qrbox: 250 },
          false
        );

        newScanner.render(
          (decodedText, decodedResult) => {
            // Process the decoded result (for example, fetch item details)
            console.log("Decoded text: ", decodedText);
            setDecodedText(decodedText);

            // Parse the URL to extract query parameters
            const url = new URL(decodedText);
            const strainId = url.pathname.split('/').pop();
            const quantity = parseInt(url.searchParams.get('quantity') || '0', 10);
            const category = url.searchParams.get('category') || '';
            const grower = url.searchParams.get('grower') || '';

            setStrainInfo({ 
              strainId: strainId || '', 
              quantity, 
              category: category || '', 
              grower: grower || '' 
            });
            setIsModalOpen(true); // Open the modal when QR code is scanned
          },
          (error) => {
            console.warn(`QR Code no match: ${error}`);
          }
        );

        setScanner(newScanner);
      }).catch(error => console.error("Failed to reinitialize scanner: ", error));
    }
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <div id="qr-reader" style={{ width: "500px" }}></div>
      <Button onClick={stopScanning}>Stop Scanning</Button>
      <Button onClick={reinitializeScanner}>Reinitialize Scanner</Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button variant={"ghost"} className="hidden">Open Modal</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Strain Information</DialogTitle>
            <DialogDescription>Details of the scanned strain</DialogDescription>
          </DialogHeader>
          {strainInfo && (
            <div className="space-y-4">
              <p><strong>Strain ID:</strong> {strainInfo.strainId}</p>
              <p><strong>Quantity:</strong> {strainInfo.quantity}</p>
              <p><strong>Category:</strong> {strainInfo.category}</p>
              <p><strong>Grower:</strong> {strainInfo.grower}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QrCodeScanner;