export type UserRole = 'admin' | 'service' | null;

export interface Alert {
  id: string;
  vehicleId: string;
  component: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  prediction: string;
  timestamp: string;
}

export interface ServiceRequest {
  id: string;
  vehicleId: string;
  owner: string;
  issue: string;
  scheduledTime: string;
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed';
  priority: 'High' | 'Normal';
}

export interface Feedback {
  id: string;
  component: string;
  issueType: string;
  rootCause: string;
  actionRequired: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number; // Optional second value for comparison
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'info' | 'success';
  read: boolean;
}