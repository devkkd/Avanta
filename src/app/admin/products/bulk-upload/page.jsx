'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Upload, FileSpreadsheet, ImageIcon, CheckCircle, XCircle, Download, AlertCircle, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

export default function BulkUploadPage() {
  const [csvFile, setCsvFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [copiedName, setCopiedName] = useState(null);

  const copyFilename = (name) => {
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 1500);
  };
  const [results, setResults] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  const handleCsvChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!f.name.match(/\.(csv|xlsx|xls)$/i)) { toast.error('Please upload a CSV or Excel file'); return; }
    setCsvFile(f);
    setResults(null);
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  const handleUpload = async () => {
    if (!csvFile) { toast.error('Please select a CSV file first'); return; }
    setUploading(true);
    const formData = new FormData();
    formData.append('file', csvFile);
    imageFiles.forEach((img) => formData.append(`img_${img.name}`, img));

    try {
      const res = await fetch('/api/admin/products/bulk-upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        toast.success('Upload complete!');
        setResults(data.results);
        setCsvFile(null);
        setImageFiles([]);
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const csv = `name,description,categorySlug,subcategorySlug,mainImage,galleryImages,sizes,material,productCare,colorName,colorCode,sku,isActive,isFeatured,isNewArrival,tags,sortOrder
"Elegant Anarkali Suit","Beautiful embroidered anarkali suit perfect for weddings","anarkali-dupatta-sets","a-line-kalidar-suits","anarkali-red.jpg","anarkali-red-2.jpg,anarkali-red-3.jpg","M:10,L:15,XL:20,2XL:10,3XL:5","Georgette","Dry clean only","Red","#FF0000","AVT001-RED",TRUE,TRUE,TRUE,"wedding,festive,ethnic",1
"Designer Kurti Set","Stylish designer kurti for casual wear","anarkali-dupatta-sets","a-line-kalidar-suits","kurti-blue.jpg","","M:20,L:25,XL:15","Cotton blend","Machine wash cold","Blue","#0000FF","AVT002-BLU",TRUE,FALSE,TRUE,"casual,daily-wear",2`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'bulk-upload-template.csv';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
    toast.success('Template downloaded!');
  };

  const canUpload = csvFile && !uploading;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bulk Product Upload</h1>
          <p className="text-sm text-gray-500 mt-1">Upload multiple products at once using a spreadsheet + images</p>
        </div>

        {/* Step 1 — Download Template */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Download the template</p>
              <p className="text-sm text-gray-500 mt-0.5">Fill in your product details. Use just the image filename (e.g. <code className="bg-gray-100 px-1 rounded text-xs">product1.jpg</code>) in the image columns.</p>
              <button
                onClick={downloadTemplate}
                className="mt-3 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
              >
                <Download size={15} /> Download Template (.csv)
              </button>
            </div>
          </div>
        </div>

        {/* Step 2 — Upload CSV */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Select your filled spreadsheet</p>
              <p className="text-sm text-gray-500 mt-0.5">CSV or Excel file (.csv, .xlsx)</p>
              <label htmlFor="csv-upload" className={`mt-3 flex items-center gap-3 border-2 border-dashed rounded-xl px-4 py-4 cursor-pointer transition ${csvFile ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'}`}>
                <FileSpreadsheet size={22} className={csvFile ? 'text-green-500' : 'text-gray-400'} />
                <div>
                  {csvFile ? (
                    <>
                      <p className="text-sm font-medium text-green-700">{csvFile.name}</p>
                      <p className="text-xs text-gray-400">{(csvFile.size / 1024).toFixed(1)} KB · Click to change</p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">Click to select file</p>
                  )}
                </div>
                {csvFile && <CheckCircle size={18} className="text-green-500 ml-auto" />}
                <input id="csv-upload" type="file" accept=".csv,.xlsx,.xls" onChange={handleCsvChange} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Step 3 — Upload Images */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Select product images</p>
              <p className="text-sm text-gray-500 mt-0.5">Select all images at once. Filenames must match what you wrote in the spreadsheet.</p>
              <label htmlFor="img-upload" className={`mt-3 flex items-center gap-3 border-2 border-dashed rounded-xl px-4 py-4 cursor-pointer transition ${imageFiles.length > 0 ? 'border-purple-400 bg-purple-50' : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50/30'}`}>
                <ImageIcon size={22} className={imageFiles.length > 0 ? 'text-purple-500' : 'text-gray-400'} />
                <div className="flex-1 min-w-0">
                  {imageFiles.length > 0 ? (
                    <p className="text-sm font-medium text-purple-700">{imageFiles.length} image{imageFiles.length > 1 ? 's' : ''} selected · Click to change</p>
                  ) : (
                    <p className="text-sm text-gray-500">Click to select images (hold Ctrl to select multiple)</p>
                  )}
                </div>
                {imageFiles.length > 0 && <CheckCircle size={18} className="text-purple-500 shrink-0" />}
                <input id="img-upload" type="file" accept="image/*" multiple onChange={handleImagesChange} className="hidden" />
              </label>

              {/* Filename list with copy buttons */}
              {imageFiles.length > 0 && (
                <div className="mt-3 space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  <p className="text-xs text-gray-400 mb-1.5">Copy filename → paste in your spreadsheet's image column:</p>
                  {imageFiles.map((f, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <ImageIcon size={12} className="text-gray-400 shrink-0" />
                        <span className="text-xs text-gray-700 truncate font-mono">{f.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyFilename(f.name)}
                        className={`shrink-0 flex items-center gap-1 text-xs px-2.5 py-1 rounded-md transition font-medium ${copiedName === f.name ? 'bg-green-100 text-green-700' : 'bg-white border border-gray-200 text-gray-500 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300'}`}
                      >
                        {copiedName === f.name ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 4 — Upload */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-start gap-4">
            <div className={`w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-sm shrink-0 ${canUpload ? 'bg-green-600' : 'bg-gray-300'}`}>4</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Upload everything</p>
              <p className="text-sm text-gray-500 mt-0.5">Images will be uploaded to cloud storage automatically.</p>
              <button
                onClick={handleUpload}
                disabled={!canUpload}
                className="mt-3 w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition text-sm"
              >
                {uploading ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Uploading, please wait...</>
                ) : (
                  <><Upload size={16} /> Start Upload</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" /> Upload Results
            </h2>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center bg-gray-50 rounded-xl py-4">
                <p className="text-2xl font-bold text-gray-700">{results.total}</p>
                <p className="text-xs text-gray-400 mt-1">Total Rows</p>
              </div>
              <div className="text-center bg-green-50 rounded-xl py-4">
                <p className="text-2xl font-bold text-green-600">{results.success}</p>
                <p className="text-xs text-gray-400 mt-1">Successful</p>
              </div>
              <div className="text-center bg-red-50 rounded-xl py-4">
                <p className="text-2xl font-bold text-red-500">{results.failed}</p>
                <p className="text-xs text-gray-400 mt-1">Failed</p>
              </div>
            </div>

            {results.imageUploads?.total > 0 && (
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center bg-gray-50 rounded-xl py-3">
                  <p className="text-xl font-bold text-gray-700">{results.imageUploads.total}</p>
                  <p className="text-xs text-gray-400 mt-1">Images Found</p>
                </div>
                <div className="text-center bg-green-50 rounded-xl py-3">
                  <p className="text-xl font-bold text-green-600">{results.imageUploads.success}</p>
                  <p className="text-xs text-gray-400 mt-1">Uploaded</p>
                </div>
                <div className="text-center bg-orange-50 rounded-xl py-3">
                  <p className="text-xl font-bold text-orange-500">{results.imageUploads.failed}</p>
                  <p className="text-xs text-gray-400 mt-1">Not Found</p>
                </div>
              </div>
            )}

            {results.errors?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-red-600 mb-2 flex items-center gap-1.5">
                  <XCircle size={15} /> {results.errors.length} error{results.errors.length > 1 ? 's' : ''}
                </p>
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {results.errors.map((err, i) => (
                    <div key={i} className="bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                      <p className="text-xs font-semibold text-gray-800">Row {err.row}: {err.data}</p>
                      <p className="text-xs text-red-600 mt-0.5">{err.error}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Collapsible Guide */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <span className="font-semibold text-gray-700 flex items-center gap-2"><AlertCircle size={16} className="text-blue-500" /> How to fill the spreadsheet</span>
            {showGuide ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </button>
          {showGuide && (
            <div className="px-5 pb-5 space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { col: 'name', req: true, desc: 'Product name' },
                  { col: 'description', req: true, desc: 'Product description' },
                  { col: 'categorySlug', req: true, desc: 'Category slug (e.g. anarkali-dupatta-sets)' },
                  { col: 'subcategorySlug', req: false, desc: 'Subcategory slug (optional)' },
                  { col: 'mainImage', req: false, desc: 'Image filename (e.g. product1.jpg)' },
                  { col: 'galleryImages', req: false, desc: 'Extra images, comma separated' },
                  { col: 'sizes', req: false, desc: 'e.g. M:10,L:15,XL:20,2XL:10,3XL:5' },
                  { col: 'colorName', req: false, desc: 'e.g. Red, Blue, Green' },
                  { col: 'colorCode', req: false, desc: 'Hex code e.g. #FF0000' },
                  { col: 'sku', req: false, desc: 'Auto-generated if empty' },
                  { col: 'isActive', req: false, desc: 'TRUE or FALSE (default: TRUE)' },
                  { col: 'isFeatured', req: false, desc: 'TRUE or FALSE' },
                  { col: 'isNewArrival', req: false, desc: 'TRUE or FALSE' },
                  { col: 'tags', req: false, desc: 'Comma separated: wedding,festive' },
                ].map(({ col, req, desc }) => (
                  <div key={col} className="flex gap-2">
                    <code className={`text-xs px-1.5 py-0.5 rounded shrink-0 h-fit ${req ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>{col}</code>
                    <span className="text-xs text-gray-500">{desc}{req ? ' (required)' : ''}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
                <strong>Tip:</strong> For images, just write the filename like <code>product1.jpg</code> — no folder path needed. Then select those same image files in Step 3.
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
