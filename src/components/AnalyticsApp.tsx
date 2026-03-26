import { useMemo } from 'react';
import { useItems, type DecryptedItem } from '@/lib/core';
import { BarChart3, Zap, Shield, FileText, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export function AnalyticsApp({ vaultId, encryptionKey }: { vaultId: string, encryptionKey: CryptoKey }) {
  const { items } = useItems(vaultId, encryptionKey);

  const stats = useMemo(() => {
    const notes = items.filter((i: DecryptedItem) => i.type === 'note');
    const noteCount = notes.length;

    // Estimate knowledge density (average word count if available, or just count)
    // For now, let's keep it simple with counts and attachment usage
    const noteWithMedia = notes.filter((n: DecryptedItem) => ((n.payload as any).attachments || []).length > 0).length;

    return {
      totalItems: noteCount,
      noteStats: { total: noteCount, withMedia: noteWithMedia },
    };
  }, [items]);

  const cards = [
    { 
      label: 'Knowledge Base', 
      value: stats.noteStats.total.toString(), 
      sub: `Encrypted notes`,
      icon: FileText,
      color: 'bg-blue-500/10 text-blue-500'
    },
    { 
      label: 'Media Intensity', 
      value: stats.noteStats.withMedia.toString(), 
      sub: `Notes with attachments`,
      icon: Zap,
      color: 'bg-amber-500/10 text-amber-500'
    },
    { 
      label: 'Security Layer', 
      value: 'AES-256', 
      sub: `Military grade encryption`,
      icon: Shield,
      color: 'bg-purple-500/10 text-purple-500'
    },
    { 
      label: 'Expert Rank', 
      value: stats.noteStats.total > 50 ? 'Master' : 'Student', 
      sub: `Based on volume`,
      icon: Award,
      color: 'bg-green-500/10 text-green-500'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/10 rounded-xl">
            <BarChart3 className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Knowledge Insights</h2>
          <p className="text-sm text-muted-foreground">Statistics on your private second brain.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group"
          >
            <div className={`p-2 rounded-lg w-fit mb-4 transition-transform group-hover:scale-110 ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
            <h3 className="text-3xl font-bold mt-1 tracking-tight">{card.value}</h3>
            <p className="text-xs text-muted-foreground/60 mt-1 font-medium italic">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-card border border-border p-8 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Privacy-First Research
            </h3>
            <p className="text-sm text-muted-foreground">
              Your notes and their metadata never leave this device. We don't analyze your content; we only provide structural insights to help you build a better knowledge base.
            </p>
          </div>
          <div className="bg-primary/10 px-6 py-4 rounded-2xl border border-primary/20">
            <p className="text-[10px] uppercase font-bold text-primary mb-1">Total Notes</p>
            <p className="text-3xl font-black text-primary">{stats.noteStats.total}</p>
          </div>
      </div>
    </div>
  );
}
