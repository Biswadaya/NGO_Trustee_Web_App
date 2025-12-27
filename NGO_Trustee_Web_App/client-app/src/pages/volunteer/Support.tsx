import { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { messageAPI } from '@/api/endpoints';
import { Send, Loader2, MessageSquare, Headphones } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const VolunteerSupport = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await messageAPI.getInbox();
      setMessages(res.data.data.messages || []);
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await messageAPI.send({
        recipient_type: 'admin',
        subject: 'Volunteer Support',
        message: newMessage,
        priority: 'high'
      });
      setNewMessage('');
      fetchMessages();
      toast.success('Support ticket updated');
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  if (loading) return <DashboardLayout><div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Headphones className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-display font-bold">Volunteer Helpdesk</h1>
        </div>
        <Card variant="glass" className="h-[600px] flex flex-col overflow-hidden">
          <CardHeader className="border-b border-border/50 bg-muted/5">
            <CardTitle className="text-sm font-bold uppercase text-muted-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Volunteer Liaison
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${msg.sender_id === user?.id
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-muted/50 border border-border/50 rounded-tl-none'
                    }`}>
                    <p className="text-sm leading-relaxed">{msg.message}</p>
                    <p className="text-[10px] opacity-70 mt-2 font-mono">{new Date(msg.created_at).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-center py-20 text-muted-foreground italic">
                  Need help with your tasks? Message us here!
                </div>
              )}
            </div>
            <div className="p-4 bg-muted/5 border-t border-border/50 flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your question..."
                className="bg-background/50 border-border/50"
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button variant="premium" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};
export default VolunteerSupport;
