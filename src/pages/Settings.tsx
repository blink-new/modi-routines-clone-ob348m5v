import React from 'react';
import { Bell, Moon, User, Download, Trash2, HelpCircle, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';

interface SettingsProps {
  theme: string;
  toggleTheme: () => void;
}

const Settings: React.FC<SettingsProps> = ({ theme, toggleTheme }) => {
  const settingSections = [
    {
      title: 'Profile',
      icon: User,
      items: [
        { label: 'Edit Profile', action: 'edit-profile', type: 'button' },
        { label: 'Change Password', action: 'change-password', type: 'button' }
      ]
    },
    {
      title: 'Preferences',
      icon: Bell,
      items: [
        { 
          label: 'Push Notifications', 
          action: 'push-notifications', 
          type: 'toggle',
          value: true
        },
        { 
          label: 'Email Reminders', 
          action: 'email-reminders', 
          type: 'toggle',
          value: false
        },
        { 
          label: 'Dark Mode', 
          action: 'dark-mode', 
          type: 'toggle',
          value: theme === 'dark',
          onChange: toggleTheme
        }
      ]
    },
    {
      title: 'Data',
      icon: Download,
      items: [
        { label: 'Export Data', action: 'export-data', type: 'button' },
        { label: 'Backup Settings', action: 'backup-settings', type: 'button' },
        { label: 'Reset All Data', action: 'reset-data', type: 'button', danger: true }
      ]
    },
    {
      title: 'Support',
      icon: HelpCircle,
      items: [
        { label: 'Help Center', action: 'help-center', type: 'link' },
        { label: 'Contact Support', action: 'contact-support', type: 'link' },
        { label: 'Privacy Policy', action: 'privacy-policy', type: 'link' },
        { label: 'Terms of Service', action: 'terms-of-service', type: 'link' }
      ]
    }
  ];

  const handleAction = (action: string) => {
    console.log('Action:', action);
    // Implement actual actions here
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your account and app preferences
        </p>
      </div>

      {/* User Profile Card */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              JD
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                John Doe
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                john.doe@example.com
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Member since January 2024
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <section.icon className="h-5 w-5" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.action} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      {item.action === 'reset-data' && (
                        <Trash2 className="h-4 w-4 text-red-500" />
                      )}
                      {item.action === 'dark-mode' && (
                        <Moon className="h-4 w-4" />
                      )}
                      {item.action === 'privacy-policy' && (
                        <Shield className="h-4 w-4" />
                      )}
                      <span className={`font-medium ${
                        item.danger 
                          ? 'text-red-600 dark:text-red-400' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    
                    {item.type === 'toggle' && (
                      <Switch
                        checked={item.value || false}
                        onCheckedChange={item.onChange || (() => handleAction(item.action))}
                      />
                    )}
                    
                    {item.type === 'button' && (
                      <Button
                        variant={item.danger ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => handleAction(item.action)}
                      >
                        {item.danger ? 'Reset' : 'Edit'}
                      </Button>
                    )}
                    
                    {item.type === 'link' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAction(item.action)}
                      >
                        Open
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* App Info */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Modi & Routines
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Version 1.0.0
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Built with ❤️ for better habits
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;