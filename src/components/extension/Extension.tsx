import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Clock,
  Target,
  Sparkles,
  CheckCircle2,
  Monitor,
  Globe,
  Download,
  ChevronRight
} from 'lucide-react';

const Extension = () => {
  const browsers = [
    {
      name: 'Google Chrome',
      icon: <Globe className="w-12 h-12" />,
      color: 'group-hover:text-blue-600',
      steps: [
        'Open Chrome and navigate to chrome://extensions',
        'Enable "Developer mode" in the top right corner',
        'Click "Load unpacked" in the top left',
        'Select the extension directory containing manifest.json',
        'The extension will be installed and appear in your toolbar'
      ]
    },
    {
      name: 'Mozilla Firefox',
      icon: <Monitor className="w-12 h-12" />,
      color: 'group-hover:text-orange-500',
      steps: [
        'Open Firefox and navigate to about:debugging',
        'Click "This Firefox" in the left sidebar',
        'Click "Load Temporary Add-on"',
        'Select the manifest.json file in your extension directory',
        'The extension will be installed and appear in your toolbar'
      ]
    },
    {
      name: 'Microsoft Edge',
      icon: <Globe className="w-12 h-12" />,
      color: 'group-hover:text-blue-500',
      steps: [
        'Open Edge and navigate to edge://extensions',
        'Enable "Developer mode" using the toggle',
        'Click "Load unpacked" button',
        'Select the extension directory containing manifest.json',
        'The extension will be installed and appear in your toolbar'
      ]
    }
  ];

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Saves Time',
      description: 'Reduce form filling time by up to 80% with smart auto-completion',
      color: 'bg-purple-500'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Boost Efficiency',
      description: 'Complete multiple forms with a single click across any website',
      color: 'bg-orange-500'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Smart Automation',
      description: 'Intelligently adapts to different form formats and field types',
      color: 'bg-cyan-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            AutoFillMe Extension
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Save time by automatically filling forms with our powerful browser extension. 
            Currently available for local development and testing.
          </p>
          <a 
            href="https://github.com/yj-shrest/extension/releases/download/V.1.1/dist.zip"
            className="inline-flex items-center gap-3 bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            Download Source Code
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group bg-white hover:shadow-xl transition-shadow duration-300 border-0 overflow-hidden">
              <CardContent className="p-8">
                <div className={`${feature.color} text-white p-4 rounded-lg inline-block mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Installation Instructions */}
        <div className="mt-24">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Installation Guide</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {browsers.map((browser, index) => (
              <div 
                key={index}
                className="group bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`flex items-center gap-4 mb-8 ${browser.color} transition-colors duration-300`}>
                  {browser.icon}
                  <h3 className="text-2xl font-bold text-gray-900">{browser.name}</h3>
                </div>
                <ol className="space-y-6">
                  {browser.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex gap-4">
                      <span className="flex-shrink-0 w-7 h-7 bg-gray-900 group-hover:bg-blue-600 rounded-full flex items-center justify-center text-sm text-white transition-colors duration-300">
                        {stepIndex + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Note */}
        <div className="mt-24">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 max-w-3xl mx-auto text-white shadow-xl">
            <h3 className="text-3xl font-bold mb-6">Developer Note</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              This extension is currently in development mode. After downloading the source code,
              you&apos;ll need to load it as an unpacked extension in your browser&apos;s developer mode.
              Follow the installation steps above for your specific browser.
            </p>
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              <span>Compatible with Chrome, Firefox, and Edge</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Extension;