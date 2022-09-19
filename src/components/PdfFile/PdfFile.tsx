import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { Button } from "@components/Common";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PdfFile = ({ src }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div>
      <div className="controls d-flex justify-content-center">
        {/* @ts-ignore */}
        <Button small dark text="previous" textUpperCase disabled={pageNumber === 1} handleClick={prevPage} otherClass="mr-5" />
        {/* @ts-ignore */}
        <Button small dark text="next" textUpperCase disabled={pageNumber === numPages} handleClick={nextPage} />
      </div>
      <div className="d-flex justify-content-center">
        <Document file={src} onLoadSuccess={onDocumentLoadSuccess} onContextMenu={(e) => e.preventDefault()} className="pdf-container">
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </div>
  );
};
export default PdfFile;
