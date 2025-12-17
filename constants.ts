import { Alert, ChartDataPoint, Feedback, ServiceRequest, AppNotification } from './types';

export const failureDistributionData: ChartDataPoint[] = [
  { name: 'Engine', value: 40 },
  { name: 'Electrical', value: 25 },
  { name: 'Wear & Tear', value: 20 },
  { name: 'Sensor-related', value: 15 },
];

export const demandForecastData: ChartDataPoint[] = [
  { name: 'Jan', value: 80, value2: 85 },
  { name: 'Feb', value: 95, value2: 92 },
  { name: 'Mar', value: 102, value2: 98 },
  { name: 'Apr', value: 110, value2: 108 },
];

export const breakdownReductionData: ChartDataPoint[] = [
  { name: 'Before AI', value: 100 },
  { name: 'After AI', value: 65 },
];

export const mockAlerts: Alert[] = [
  { id: 'AL-101', vehicleId: 'KA-01-MJ-1234', component: 'Engine', severity: 'Critical', prediction: 'Thermal runaway in 48h', timestamp: '10 mins ago' },
  { id: 'AL-102', vehicleId: 'MH-02-AB-9876', component: 'Brakes', severity: 'High', prediction: 'Pad wear limit < 5%', timestamp: '1 hour ago' },
  { id: 'AL-103', vehicleId: 'DL-05-XY-5555', component: 'Battery', severity: 'Medium', prediction: 'Voltage irregularity', timestamp: '3 hours ago' },
];

export const mockServiceRequests: ServiceRequest[] = [
  { id: 'SR-501', vehicleId: 'KA-01-MJ-1234', owner: 'Atul Roshan', issue: 'Engine Overheating', scheduledTime: 'Today, 14:00', status: 'Confirmed', priority: 'High' },
  { id: 'SR-502', vehicleId: 'TS-09-LK-0001', owner: 'Sai Karthik', issue: 'Brake Pad Replacement', scheduledTime: 'Tomorrow, 10:00', status: 'Pending', priority: 'Normal' },
  { id: 'SR-503', vehicleId: 'AP-12-ZZ-3333', owner: 'V. Sahasra', issue: 'Battery Diagnostics', scheduledTime: 'Tomorrow, 11:30', status: 'In Progress', priority: 'High' },
];

export const manufacturingFeedback: Feedback[] = [
  { id: 'FB-001', component: 'Fuel Pump', issueType: 'Premature Wear', rootCause: 'Seal material degradation batch #402', actionRequired: 'Revise material spec to polymer X9' },
  { id: 'FB-002', component: 'ABS Sensor', issueType: 'Signal Noise', rootCause: 'Improper shielding in assembly', actionRequired: 'Update assembly QA checkpoint' },
];

export const heatmapData = [
  { component: 'Engine', low: 2, med: 5, high: 9 },
  { component: 'Brakes', low: 1, med: 3, high: 6 },
  { component: 'Battery', low: 1, med: 4, high: 8 },
  { component: 'Sensors', low: 2, med: 6, high: 3 },
];

export const adminNotifications: AppNotification[] = [
  { id: '1', title: 'Critical Fleet Alert', message: 'Engine failure predicted for KA-01-MJ-1234 within 48 hours.', time: '5m ago', type: 'alert', read: false },
  { id: '2', title: 'New RCA Generated', message: 'AI has identified a batch-wide issue in ABS sensors for 2024 models.', time: '1h ago', type: 'info', read: false },
  { id: '3', title: 'Sync Successful', message: 'Global telemetry data successfully synced from 1,200 edge units.', time: '3h ago', type: 'success', read: true },
];

export const serviceNotifications: AppNotification[] = [
  { id: '1', title: 'High Priority Booking', message: 'Atul Roshan confirmed an urgent engine diagnostic for 2 PM today.', time: '2m ago', type: 'success', read: false },
  { id: '2', title: 'Bay Capacity Warning', message: 'Service bays reaching 90% capacity for the afternoon shift.', time: '45m ago', type: 'alert', read: false },
  { id: '3', title: 'Voice Agent Update', message: 'AI Agent "Kore" has been updated with new scheduling protocols.', time: '2h ago', type: 'info', read: true },
];