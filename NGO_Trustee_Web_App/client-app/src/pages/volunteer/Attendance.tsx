import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { attendanceRecords } from '@/data/mockData';

const VolunteerAttendance = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Attendance</h1>
      <Card variant="glass">
        <CardHeader><CardTitle>Attendance Records</CardTitle></CardHeader>
        <CardContent>
          <table className="premium-table">
            <thead><tr><th>Date</th><th>Event</th><th>Check In</th><th>Check Out</th><th>Hours</th><th>Status</th></tr></thead>
            <tbody>
              {attendanceRecords.map((r) => (
                <tr key={r.id}>
                  <td>{r.date}</td>
                  <td>{r.event}</td>
                  <td>{r.checkIn}</td>
                  <td>{r.checkOut}</td>
                  <td>{r.hours} hrs</td>
                  <td><Badge variant={r.status === 'Present' ? 'active' : 'inactive'}>{r.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  </DashboardLayout>
);
export default VolunteerAttendance;
