import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, MapPin, Ticket } from "lucide-react";

interface TicketCardProps {
    registration: any;
}

const TicketCard = ({ registration }: TicketCardProps) => {
    const { event, ticket_id, registered_at, status } = registration;

    return (
        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold">{event.title}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {status.toUpperCase()}
                    </span>
                </div>
                <p className="text-sm text-muted-foreground">Registered on {format(new Date(registered_at), 'PPP')}</p>
            </CardHeader>
            <CardContent>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{format(new Date(event.date), 'PPP p')}</span>
                    </div>
                    {event.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{event.location}</span>
                        </div>
                    )}
                    <div className="pt-2 border-t mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-primary font-mono bg-primary/10 px-2 py-1 rounded">
                            <Ticket className="w-4 h-4" />
                            <span>{ticket_id}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Admit One
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default TicketCard;
