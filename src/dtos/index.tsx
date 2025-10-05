export type ExamStatus =
  | 'pending' // aguardando laudo
  | 'in_process' // em processo
  | 'in_review' // revisão
  | 'rectification' // retificação
  | 'audited' // auditado
  | 'reported' // laudados
  | 'delivered'; // entregues

export interface ExamDTO {
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
}

export interface User {
  id: string;
  name: string;
  cellphone: string;
  logo_url: string;
  avatar: string;
  avatar_url: string;
  verified: boolean;
  role: string;
  email: string;
  cpf: string;
  rg: string;
  crm: string;
  sus: string;
  bank: string;
  agency: string;
  account: string;
  street: string;
  complemento: string;
  number: string;
  cep: string;
  bairro: string;
  cidade: string;
  uf: string;
  created_at: Date;
  updated_at: Date;
  birthday: Date;
}
