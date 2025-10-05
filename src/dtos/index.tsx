export type ExamFileStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'DONE'
  | 'ERROR'
  | string;

export interface ExamFileDTO {
  id: string;
  name: string | null;
  status: ExamFileStatus;
  file_url?: string | null;
  data_exame: string | null;
  created_at: string;
  updated_at: string;
  token_id: string;
  mod?: string | null;
  paciente?: string | null;
  instituicao?: string | null;
  exame_desc?: string | null;
  id_paciente?: string | null;
}

export interface ExamDTO {
  id: number;
  modality: string;
  examName: string;
  patientName: string;
  patientId: string;
  examDate: string;
  type: 'Eletivo' | 'Urgente' | 'Emergência' | string;
  criticalFindings: boolean;
  images: number;
  status: 'pending' | 'in_process' | 'completed' | 'canceled' | string;
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
