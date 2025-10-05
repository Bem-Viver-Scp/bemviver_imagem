export type ExamStatus =
  | 'pending' // aguardando laudo
  | 'in_process' // em processo
  | 'in_review' // revisão
  | 'rectification' // retificação
  | 'audited' // auditado
  | 'reported' // laudados
  | 'delivered'; // entregues

export type ExamDTO = {
  id: number;
  modality: 'CT' | 'MR' | 'XR' | 'US' | 'MG' | 'NM' | 'OT';
  examName: string;
  patientName: string;
  patientId: string;
  examDate: string; // ISO
  type: 'Eletivo' | 'Urgente';
  criticalFindings: boolean;
  images: number;
  status: ExamStatus;
};
