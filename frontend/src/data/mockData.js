export const mockVariants = [
  { variant_id: 'rs121913530', gene: 'MLH1', clinvar_status: 'Pathogenic', frequency: 0.002, classification: 'Likely Pathogenic', chromosome: '3', position: 37034840, ref_allele: 'G', alt_allele: 'A', status: 'pending' },
  { variant_id: 'rs1801133', gene: 'MTHFR', clinvar_status: 'Benign', frequency: 0.12, classification: 'Likely Benign', chromosome: '1', position: 11856378, ref_allele: 'C', alt_allele: 'T', status: 'pending' },
  { variant_id: 'rs104894915', gene: 'BRCA1', clinvar_status: 'Pathogenic', frequency: 0.0001, classification: 'Pathogenic', chromosome: '17', position: 41197708, ref_allele: 'C', alt_allele: 'T', status: 'pending' },
  { variant_id: 'rs80357382', gene: 'BRCA2', clinvar_status: 'Likely Pathogenic', frequency: 0.0003, classification: 'Likely Pathogenic', chromosome: '13', position: 32890598, ref_allele: 'A', alt_allele: 'G', status: 'pending' },
  { variant_id: 'rs121913343', gene: 'TP53', clinvar_status: 'Pathogenic', frequency: 0.0002, classification: 'Pathogenic', chromosome: '17', position: 7577120, ref_allele: 'G', alt_allele: 'A', status: 'pending' },
  { variant_id: 'rs28934571', gene: 'RYR1', clinvar_status: 'Likely Benign', frequency: 0.08, classification: 'Likely Benign', chromosome: '19', position: 38924341, ref_allele: 'T', alt_allele: 'C', status: 'pending' },
  { variant_id: 'rs121913364', gene: 'CFTR', clinvar_status: 'Pathogenic', frequency: 0.001, classification: 'Pathogenic', chromosome: '7', position: 117199644, ref_allele: 'CTT', alt_allele: 'C', status: 'pending' },
  { variant_id: 'rs28940580', gene: 'LDLR', clinvar_status: 'Likely Pathogenic', frequency: 0.0005, classification: 'Likely Pathogenic', chromosome: '19', position: 11089362, ref_allele: 'C', alt_allele: 'T', status: 'pending' },
  { variant_id: 'rs1799990', gene: 'CCR5', clinvar_status: 'Benign', frequency: 0.15, classification: 'Benign', chromosome: '3', position: 46414943, ref_allele: 'CCR5', alt_allele: 'CCR5Δ32', status: 'pending' },
  { variant_id: 'rs121908755', gene: 'MSH2', clinvar_status: 'Pathogenic', frequency: 0.0001, classification: 'Pathogenic', chromosome: '2', position: 47630205, ref_allele: 'G', alt_allele: 'T', status: 'pending' },
  { variant_id: 'rs28940871', gene: 'APOE', clinvar_status: 'Risk Factor', frequency: 0.14, classification: 'Risk Factor', chromosome: '19', position: 45411941, ref_allele: 'T', alt_allele: 'C', status: 'pending' },
  { variant_id: 'rs104894258', gene: 'PKU', clinvar_status: 'Pathogenic', frequency: 0.003, classification: 'Pathogenic', chromosome: '12', position: 103232271, ref_allele: 'C', alt_allele: 'T', status: 'pending' }
];

export const mockEvidence = {
  rs121913530: {
    variant_id: 'rs121913530',
    gene_function: 'MLH1 is a DNA mismatch repair gene involved in maintaining genomic stability',
    disease_association: 'Lynch syndrome, hereditary nonpolyposis colorectal cancer (HNPCC)',
    population_data: { gnomad_frequency: 0.0018, exac_frequency: 0.0022 },
    functional_predictions: { sift: 'Deleterious', polyphen: 'Probably damaging', cadd_score: 25.3 },
    literature_evidence: [
      'Loss of MLH1 expression in colorectal tumors',
      'Functional studies demonstrate impaired DNA repair',
      'Segregation analysis in multiple families'
    ],
    clinical_significance: 'Well-established pathogenic variant with high penetrance'
  },
  rs1801133: {
    variant_id: 'rs1801133',
    gene_function: 'MTHFR encodes methylenetetrahydrofolate reductase, involved in folate metabolism',
    disease_association: 'Mild association with neural tube defects, cardiovascular disease risk',
    population_data: { gnomad_frequency: 0.118, exac_frequency: 0.124 },
    functional_predictions: { sift: 'Tolerated', polyphen: 'Benign', cadd_score: 8.1 },
    literature_evidence: [
      'Common polymorphism with population-specific frequencies',
      'Meta-analyses show weak disease associations',
      'Functional studies show reduced enzyme activity'
    ],
    clinical_significance: 'Common variant with minimal clinical impact'
  }
};
