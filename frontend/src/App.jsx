import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input, Label } from './components/ui/input';
import { Upload, FileText, Check, X, Download, Eye, Filter } from 'lucide-react';

import { mockVariants as initialVariants, mockEvidence } from './data/mockData';
import { uploadVcf } from './services/api';

export default function VariantReviewApp() {
  const [variants, setVariants] = useState(initialVariants);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setUploadError('');
    setIsUploading(true);
    try {
      const result = await uploadVcf(file);
      if (Array.isArray(result?.data)) {
        setVariants(result.data);
      } else if (Array.isArray(result?.variants)) {
        setVariants(result.variants);
      }
    } catch (err) {
      console.error('VCF upload failed:', err);
      setUploadError('Upload failed. Please ensure a valid .vcf or .vcf.gz file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleVariantAction = (variantId, action) => {
    setVariants(prev =>
      prev.map(variant =>
        variant.variant_id === variantId
          ? { ...variant, status: action }
          : variant
      )
    );
  };

  const handleVariantClick = (variant) => {
    setSelectedVariant(variant);
    setSelectedEvidence(mockEvidence[variant.variant_id] || null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getClassificationColor = (classification) => {
    if (classification.includes('Pathogenic')) return 'text-red-600';
    if (classification.includes('Benign')) return 'text-green-600';
    if (classification.includes('Risk')) return 'text-orange-600';
    return 'text-gray-600';
  };

  const filteredVariants = variants.filter(variant =>
    filterStatus === 'all' || variant.status === filterStatus
  );

  const generatePDFReport = async () => {
    setIsGeneratingReport(true);
    try {
      const approvedVariants = variants.filter(v => v.status === 'approved');

      if (approvedVariants.length === 0) {
        alert('No approved variants to include in the report.');
        setIsGeneratingReport(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.text('Genomic Variant Analysis Report', 20, 20);

      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
      doc.text(`Total Approved Variants: ${approvedVariants.length}`, 20, 45);

      doc.line(20, 55, 190, 55);

      let yPosition = 70;

      approvedVariants.forEach((variant, index) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(14);
        doc.text(`${index + 1}. ${variant.gene} (${variant.variant_id})`, 20, yPosition);

        doc.setFontSize(10);
        yPosition += 10;
        doc.text(`Classification: ${variant.classification}`, 30, yPosition);

        yPosition += 8;
        doc.text(`Location: chr${variant.chromosome}:${variant.position}`, 30, yPosition);

        yPosition += 8;
        doc.text(`Change: ${variant.ref_allele} → ${variant.alt_allele}`, 30, yPosition);

        yPosition += 8;
        doc.text(`Frequency: ${(variant.frequency * 100).toFixed(2)}%`, 30, yPosition);

        yPosition += 8;
        doc.text(`ClinVar Status: ${variant.clinvar_status}`, 30, yPosition);

        yPosition += 15;
      });


      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(`Page ${i} of ${pageCount}`, 170, 290);
        doc.text('Genomic Variant Review Platform', 20, 290);
      }

      const filename = `variant-report-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(filename);

    } catch (error) {
      console.error('Error generating PDF report:', error);
      alert('Error generating PDF report. Please try again.');
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Genomic Variant Review Platform</h1>
          <p className="text-sm md:text-base text-gray-600">AI-driven genomics platform for variant analysis and clinical review</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              VCF File Upload
            </CardTitle>
            <CardDescription>
              Upload your VCF file for variant analysis. Currently using mock data for demonstration.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="vcf-file">Select VCF File</Label>
                <Input
                  id="vcf-file"
                  type="file"
                  accept=".vcf,.vcf.gz"
                  onChange={handleFileUpload}
                  className="mt-1"
                />
              </div>
              {uploadedFile && (
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">{uploadedFile.name}</span>
                  {isUploading && <span className="text-blue-600">Uploading…</span>}
                </div>
              )}
            </div>
            {uploadError && (
              <div className="mt-2 text-sm text-red-600">{uploadError}</div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white"
                >
                  <option value="all">All Variants</option>
                  <option value="pending">Pending Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <span className="text-sm text-gray-500">
                  ({filteredVariants.length} variants)
                </span>
              </div>

              <Button
                onClick={generatePDFReport}
                disabled={!variants.some(v => v.status === 'approved') || isGeneratingReport}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                {isGeneratingReport ? 'Generating...' : 'Generate Report'}
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Variant Analysis Results</CardTitle>
                <CardDescription>
                  Click on any variant to view detailed evidence and approve/reject
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px]">
                    <thead className="border-b bg-gray-50">
                      <tr>
                        <th className="text-left p-2 md:p-3 font-medium text-xs md:text-sm">Gene</th>
                        <th className="text-left p-2 md:p-3 font-medium text-xs md:text-sm">Variant ID</th>
                        <th className="text-left p-2 md:p-3 font-medium text-xs md:text-sm hidden sm:table-cell">ClinVar Status</th>
                        <th className="text-left p-2 md:p-3 font-medium text-xs md:text-sm hidden md:table-cell">Frequency</th>
                        <th className="text-left p-2 md:p-3 font-medium text-xs md:text-sm">Classification</th>
                        <th className="text-left p-2 md:p-3 font-medium text-xs md:text-sm">Status</th>
                        <th className="text-left p-2 md:p-3 font-medium text-xs md:text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVariants.map((variant) => (
                        <tr
                          key={variant.variant_id}
                          className="border-b hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleVariantClick(variant)}
                        >
                          <td className="p-2 md:p-3 font-medium text-sm">{variant.gene}</td>
                          <td className="p-2 md:p-3 text-xs md:text-sm font-mono">{variant.variant_id}</td>
                          <td className="p-2 md:p-3 hidden sm:table-cell">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${variant.clinvar_status.includes('Pathogenic')
                                ? 'bg-red-100 text-red-800'
                                : 'bg-green-100 text-green-800'
                              }`}>
                              {variant.clinvar_status}
                            </span>
                          </td>
                          <td className="p-2 md:p-3 text-xs md:text-sm hidden md:table-cell">{(variant.frequency * 100).toFixed(2)}%</td>
                          <td className={`p-2 md:p-3 text-xs md:text-sm font-medium ${getClassificationColor(variant.classification)}`}>
                            <span className="hidden md:inline">{variant.classification}</span>
                            <span className="md:hidden">
                              {variant.classification.includes('Pathogenic') ? 'Path' :
                                variant.classification.includes('Benign') ? 'Ben' :
                                  variant.classification.includes('Risk') ? 'Risk' : 'Unk'}
                            </span>
                          </td>
                          <td className="p-2 md:p-3">
                            <span className={`px-1 md:px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(variant.status)}`}>
                              <span className="hidden sm:inline">{variant.status}</span>
                              <span className="sm:hidden">
                                {variant.status === 'approved' ? 'App' :
                                  variant.status === 'rejected' ? 'Rej' : 'Pen'}
                              </span>
                            </span>
                          </td>
                          <td className="p-2 md:p-3">
                            <div className="flex gap-1 md:gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleVariantAction(variant.variant_id, 'approved');
                                }}
                                disabled={variant.status === 'approved'}
                                className="text-green-600 border-green-200 hover:bg-green-50 p-1 md:p-2"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleVariantAction(variant.variant_id, 'rejected');
                                }}
                                disabled={variant.status === 'rejected'}
                                className="text-red-600 border-red-200 hover:bg-red-50 p-1 md:p-2"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {selectedVariant && (
            <div className="w-full lg:w-96 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Variant Details
                  </CardTitle>
                  <CardDescription>
                    Detailed evidence for {selectedVariant.variant_id}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm text-gray-600">Genomic Location</h4>
                      <p className="text-sm">
                        chr{selectedVariant.chromosome}:{selectedVariant.position}
                      </p>
                      <p className="text-sm font-mono">
                        {selectedVariant.ref_allele} → {selectedVariant.alt_allele}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-gray-600">Gene Function</h4>
                      <p className="text-sm">
                        {selectedEvidence?.gene_function || "No functional data available"}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-gray-600">Disease Association</h4>
                      <p className="text-sm">
                        {selectedEvidence?.disease_association || "No disease association data"}
                      </p>
                    </div>
                  </div>

                  {selectedEvidence?.population_data && (
                    <div className="border-t pt-3">
                      <h4 className="font-medium text-sm text-gray-600 mb-2">Population Frequencies</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>gnomAD:</span>
                          <span>{(selectedEvidence.population_data.gnomad_frequency * 100).toFixed(3)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ExAC:</span>
                          <span>{(selectedEvidence.population_data.exac_frequency * 100).toFixed(3)}%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedEvidence?.functional_predictions && (
                    <div className="border-t pt-3">
                      <h4 className="font-medium text-sm text-gray-600 mb-2">Functional Predictions</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>SIFT:</span>
                          <span className={
                            selectedEvidence.functional_predictions.sift === 'Deleterious'
                              ? 'text-red-600' : 'text-green-600'
                          }>
                            {selectedEvidence.functional_predictions.sift}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>PolyPhen:</span>
                          <span className={
                            selectedEvidence.functional_predictions.polyphen.includes('damaging')
                              ? 'text-red-600' : 'text-green-600'
                          }>
                            {selectedEvidence.functional_predictions.polyphen}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>CADD Score:</span>
                          <span>{selectedEvidence.functional_predictions.cadd_score}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedEvidence?.literature_evidence && (
                    <div className="border-t pt-3">
                      <h4 className="font-medium text-sm text-gray-600 mb-2">Literature Evidence</h4>
                      <ul className="space-y-1 text-sm">
                        {selectedEvidence.literature_evidence.map((evidence, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-gray-500 mt-1">•</span>
                            <span>{evidence}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedEvidence?.clinical_significance && (
                    <div className="border-t pt-3">
                      <h4 className="font-medium text-sm text-gray-600 mb-2">Clinical Significance</h4>
                      <p className="text-sm">{selectedEvidence.clinical_significance}</p>
                    </div>
                  )}

                  <div className="border-t pt-3 flex flex-col sm:flex-row gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleVariantAction(selectedVariant.variant_id, 'approved')}
                      disabled={selectedVariant.status === 'approved'}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleVariantAction(selectedVariant.variant_id, 'rejected')}
                      disabled={selectedVariant.status === 'rejected'}
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {variants.length}
              </div>
              <div className="text-sm text-gray-600">Total Variants</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {variants.filter(v => v.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {variants.filter(v => v.status === 'approved').length}
              </div>
              <div className="text-sm text-gray-600">Approved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {variants.filter(v => v.status === 'rejected').length}
              </div>
              <div className="text-sm text-gray-600">Rejected</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}