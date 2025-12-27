import { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { messageAPI } from '@/api/endpoints';
import { Send, Loader2, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const UserSupport = () => {
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
        subject: 'Support Request',
        message: newMessage,
        priority: 'normal'
      });
      setNewMessage('');
      fetchMessages();
      toast.success('Message sent');
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  if (loading) return <DashboardLayout><div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-display font-bold">Support Center</h1>
        </div>
        <Card variant="glass" className="h-[600px] flex flex-col overflow-hidden">
          <CardHeader className="border-b border-border/50 bg-muted/5">
            <CardTitle className="text-sm font-bold uppercase text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Direct Support Agent
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
                  No messages yet. Start a conversation with our support team!
                </div>
              )}
            </div>
            <div className="p-4 bg-muted/5 border-t border-border/50 flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your concern here..."
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
export default UserSupport;
