// ============================================
// CREDENCE - Hiring Messages Page
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Star,
  Archive,
  Trash2,
  CheckCheck,
  Clock,
  Filter,
  Plus,
  X,
  Users,
  MessageSquare
} from 'lucide-react';

const conversations = [
  {
    id: 1,
    name: 'Rahul Sharma',
    avatar: 'RS',
    position: 'Senior Frontend Developer',
    lastMessage: 'Thank you for the opportunity! I am very excited about the role.',
    time: '10:30 AM',
    unread: 2,
    online: true,
    messages: [
      { id: 1, sender: 'them', text: 'Hi! Thank you for shortlisting me for the Frontend Developer position.', time: '10:00 AM' },
      { id: 2, sender: 'me', text: 'Hi Rahul! We were impressed with your profile. When are you available for a technical interview?', time: '10:15 AM' },
      { id: 3, sender: 'them', text: 'I am available this week, preferably Thursday or Friday afternoon.', time: '10:20 AM' },
      { id: 4, sender: 'them', text: 'Thank you for the opportunity! I am very excited about the role.', time: '10:30 AM' },
    ]
  },
  {
    id: 2,
    name: 'Priya Patel',
    avatar: 'PP',
    position: 'Data Scientist',
    lastMessage: 'Looking forward to the next round!',
    time: 'Yesterday',
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: 'me', text: 'Hi Priya, congratulations on clearing the first round!', time: 'Yesterday' },
      { id: 2, sender: 'them', text: 'Thank you so much! What are the next steps?', time: 'Yesterday' },
      { id: 3, sender: 'me', text: 'We will schedule a technical interview with our ML team this week.', time: 'Yesterday' },
      { id: 4, sender: 'them', text: 'Looking forward to the next round!', time: 'Yesterday' },
    ]
  },
  {
    id: 3,
    name: 'Amit Kumar',
    avatar: 'AK',
    position: 'Backend Engineer',
    lastMessage: 'I have some questions about the offer.',
    time: 'Yesterday',
    unread: 1,
    online: true,
    messages: [
      { id: 1, sender: 'me', text: 'Congratulations Amit! We would like to extend an offer to you.', time: 'Yesterday' },
      { id: 2, sender: 'them', text: 'Wow, thank you! This is great news.', time: 'Yesterday' },
      { id: 3, sender: 'them', text: 'I have some questions about the offer.', time: 'Yesterday' },
    ]
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    avatar: 'SR',
    position: 'Frontend Developer',
    lastMessage: 'Could you share more details about the tech stack?',
    time: '2 days ago',
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: 'them', text: 'Hi, I saw the job posting for Frontend Developer.', time: '2 days ago' },
      { id: 2, sender: 'me', text: 'Hi Sneha! Yes, we are actively hiring. Your profile looks great!', time: '2 days ago' },
      { id: 3, sender: 'them', text: 'Could you share more details about the tech stack?', time: '2 days ago' },
    ]
  },
  {
    id: 5,
    name: 'Vikram Singh',
    avatar: 'VS',
    position: 'DevOps Engineer',
    lastMessage: 'I have accepted the offer! Excited to join.',
    time: '3 days ago',
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: 'me', text: 'Hi Vikram, have you had a chance to review the offer?', time: '3 days ago' },
      { id: 2, sender: 'them', text: 'Yes, I have reviewed it thoroughly.', time: '3 days ago' },
      { id: 3, sender: 'them', text: 'I have accepted the offer! Excited to join.', time: '3 days ago' },
    ]
  }
];

const templates = [
  { id: 1, name: 'Interview Invitation', text: 'Dear [Name], We would like to invite you for an interview for the [Position] role...' },
  { id: 2, name: 'Thank You', text: 'Thank you for taking the time to interview with us. We will be in touch soon...' },
  { id: 3, name: 'Offer Letter', text: 'Congratulations! We are pleased to extend an offer for the position of [Position]...' },
  { id: 4, name: 'Follow Up', text: 'Hi [Name], I wanted to follow up on our previous conversation...' },
];

export default function HiringMessages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || (filter === 'unread' && conv.unread > 0);
    return matchesSearch && matchesFilter;
  });

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    // In a real app, this would send the message to the backend
    console.log('Sending message:', messageInput);
    setMessageInput('');
  };

  const handleUseTemplate = (template: typeof templates[0]) => {
    setMessageInput(template.text);
    setShowTemplates(false);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden">
      {/* Conversations List */}
      <div className="w-80 border-r border-dark-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-dark-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Messages</h2>
            {totalUnread > 0 && (
              <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                {totalUnread}
              </span>
            )}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-1.5 text-xs rounded-lg transition-colors ${
                filter === 'all' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`flex-1 py-1.5 text-xs rounded-lg transition-colors ${
                filter === 'unread' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              Unread
            </button>
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(conversation => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-dark-700 cursor-pointer transition-colors ${
                selectedConversation.id === conversation.id
                  ? 'bg-dark-700'
                  : 'hover:bg-dark-700/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-medium">
                    {conversation.avatar}
                  </div>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-dark-800 rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-white truncate">{conversation.name}</h4>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{conversation.position}</p>
                  <p className="text-sm text-gray-400 truncate mt-1">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <span className="w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                    {conversation.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-dark-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-medium">
                {selectedConversation.avatar}
              </div>
              {selectedConversation.online && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-dark-800 rounded-full" />
              )}
            </div>
            <div>
              <h3 className="text-white font-medium">{selectedConversation.name}</h3>
              <p className="text-xs text-gray-500">
                {selectedConversation.online ? 'Online' : 'Offline'} • {selectedConversation.position}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedConversation.messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.sender === 'me'
                    ? 'bg-orange-500 text-white rounded-br-sm'
                    : 'bg-dark-700 text-white rounded-bl-sm'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className={`flex items-center gap-1 mt-1 ${
                  message.sender === 'me' ? 'justify-end' : 'justify-start'
                }`}>
                  <span className={`text-xs ${message.sender === 'me' ? 'text-orange-200' : 'text-gray-500'}`}>
                    {message.time}
                  </span>
                  {message.sender === 'me' && (
                    <CheckCheck className="w-3 h-3 text-orange-200" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-dark-700">
          {/* Templates */}
          <AnimatePresence>
            {showTemplates && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mb-4 bg-dark-700 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-white">Message Templates</h4>
                  <button
                    onClick={() => setShowTemplates(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {templates.map(template => (
                    <button
                      key={template.id}
                      onClick={() => handleUseTemplate(template)}
                      className="w-full text-left p-3 bg-dark-600 hover:bg-dark-500 rounded-lg transition-colors"
                    >
                      <p className="text-sm font-medium text-white">{template.name}</p>
                      <p className="text-xs text-gray-400 truncate mt-1">{template.text}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className={`p-2 rounded-lg transition-colors ${
                showTemplates ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-dark-700 border border-dark-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
              className="p-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
