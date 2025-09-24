'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Sparkles, Layout, Users, Target } from "lucide-react"

export const dynamic = 'force-dynamic'

interface ConsultationData {
  clientName: string
  clientEmail: string
  applicationType: string
  targetAudience: string
  coreProblem: string
  designPreferences: string
  essentialFeatures: string[]
  timeline: string
  budget: string
}

export default function MVPPrototypeConsultation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [consultationData, setConsultationData] = useState<ConsultationData>({
    clientName: '',
    clientEmail: '',
    applicationType: '',
    targetAudience: '',
    coreProblem: '',
    designPreferences: '',
    essentialFeatures: [],
    timeline: '',
    budget: ''
  })

  const steps = [
    'Contact Info',
    'Application Type',
    'Target Audience',
    'Core Problem',
    'Design & Features',
    'Project Details'
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFeatureToggle = (feature: string) => {
    setConsultationData(prev => ({
      ...prev,
      essentialFeatures: prev.essentialFeatures.includes(feature)
        ? prev.essentialFeatures.filter(f => f !== feature)
        : [...prev.essentialFeatures, feature]
    }))
  }

  const handleSubmit = () => {
    console.log('Consultation Data:', consultationData)
    // Here you would typically send the data to your backend
    alert('Thank you! We will get back to you with your tailored 3-page MVP prototype proposal.')
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="clientName">Full Name</Label>
              <Input
                id="clientName"
                value={consultationData.clientName}
                onChange={(e) => setConsultationData(prev => ({ ...prev, clientName: e.target.value }))}
                placeholder="Your full name"
              />
            </div>
            <div>
              <Label htmlFor="clientEmail">Email Address</Label>
              <Input
                id="clientEmail"
                type="email"
                value={consultationData.clientEmail}
                onChange={(e) => setConsultationData(prev => ({ ...prev, clientEmail: e.target.value }))}
                placeholder="your.email@example.com"
              />
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-4">
            <Label>What type of application do you need?</Label>
            <RadioGroup
              value={consultationData.applicationType}
              onValueChange={(value) => setConsultationData(prev => ({ ...prev, applicationType: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="web-app" id="web-app" />
                <Label htmlFor="web-app">Web Application</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mobile-app" id="mobile-app" />
                <Label htmlFor="mobile-app">Mobile Application</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="saas-platform" id="saas-platform" />
                <Label htmlFor="saas-platform">SaaS Platform</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="e-commerce" id="e-commerce" />
                <Label htmlFor="e-commerce">E-commerce Store</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dashboard" id="dashboard" />
                <Label htmlFor="dashboard">Analytics Dashboard</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <Label htmlFor="targetAudience">Who is your target audience?</Label>
            <Textarea
              id="targetAudience"
              value={consultationData.targetAudience}
              onChange={(e) => setConsultationData(prev => ({ ...prev, targetAudience: e.target.value }))}
              placeholder="Describe your ideal users, their demographics, pain points, and behaviors..."
              className="min-h-[100px]"
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <Label htmlFor="coreProblem">What core problem does your application solve?</Label>
            <Textarea
              id="coreProblem"
              value={consultationData.coreProblem}
              onChange={(e) => setConsultationData(prev => ({ ...prev, coreProblem: e.target.value }))}
              placeholder="Explain the main problem your application addresses and how it provides value..."
              className="min-h-[100px]"
            />
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label>Design Preferences</Label>
              <Select
                value={consultationData.designPreferences}
                onValueChange={(value) => setConsultationData(prev => ({ ...prev, designPreferences: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your preferred design style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern-minimal">Modern & Minimal</SelectItem>
                  <SelectItem value="bold-vibrant">Bold & Vibrant</SelectItem>
                  <SelectItem value="professional-corporate">Professional & Corporate</SelectItem>
                  <SelectItem value="creative-artistic">Creative & Artistic</SelectItem>
                  <SelectItem value="clean-simple">Clean & Simple</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Essential Features (Select all that apply)</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  'User Authentication',
                  'Data Dashboard',
                  'Search Functionality',
                  'File Upload',
                  'Real-time Updates',
                  'Payment Integration',
                  'Email Notifications',
                  'Social Features',
                  'Analytics Tracking',
                  'Mobile Responsive',
                  'API Integration',
                  'Admin Panel'
                ].map((feature) => (
                  <div
                    key={feature}
                    className={`p-2 rounded-md border cursor-pointer transition-all ${
                      consultationData.essentialFeatures.includes(feature)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleFeatureToggle(feature)}
                  >
                    <div className="text-sm font-medium">{feature}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <Label>Preferred Timeline</Label>
              <Select
                value={consultationData.timeline}
                onValueChange={(value) => setConsultationData(prev => ({ ...prev, timeline: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="When do you need this completed?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">ASAP (Rush Job)</SelectItem>
                  <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                  <SelectItem value="3-4-weeks">3-4 weeks</SelectItem>
                  <SelectItem value="1-2-months">1-2 months</SelectItem>
                  <SelectItem value="flexible">Flexible timing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Budget Range</Label>
              <Select
                value={consultationData.budget}
                onValueChange={(value) => setConsultationData(prev => ({ ...prev, budget: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="What's your budget for this project?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-5k">Under $5,000</SelectItem>
                  <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                  <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                  <SelectItem value="50k-plus">$50,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MVP PROTOTYPE</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#solutions" className="text-gray-600 hover:text-gray-900">Solutions</a>
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#portfolio" className="text-gray-600 hover:text-gray-900">Portfolio</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </nav>
            <Button className="bg-purple-600 hover:bg-purple-700">
              START PROJECT
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="h-96 flex items-center justify-center relative"
          style={{ background: 'var(--gradient-purple)' }}
        >
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              UNLOCK YOUR DIGITAL IMAGINATION
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Transform Ideas into Interactive 3D Experiences
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
            >
              EXPLORE IDEAS
            </Button>
          </div>

          {/* Floating 3D Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-lg rotate-12 animate-pulse"></div>
            <div className="absolute top-32 right-20 w-12 h-12 bg-white/10 rounded-full animate-bounce"></div>
            <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-white/10 rounded-lg rotate-45 animate-pulse delay-300"></div>
            <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-white/10 rounded-full animate-bounce delay-500"></div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">SOLUTIONS</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layout className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>DESIGN VISUALIZATION</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Beautiful UI mockups that bring your vision to life with pixel-perfect design and user experience focus.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>INTERACTIVE EXPERIENCES</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Functionally sound prototypes with interactive elements that demonstrate core user workflows.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>TECH INTEGRATION</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Strategic technology recommendations and integration planning for scalable development.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="consultation" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              MVP Prototype Design Proposal Consultation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Answer 5 key questions to receive your tailored 3-page prototype with beautiful UI mockups,
              mock data, and a clear vision for your project.
            </p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-center mb-4">
                <CardTitle>Step {currentStep + 1} of {steps.length}: {steps[currentStep]}</CardTitle>
                <div className="flex space-x-1">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index <= currentStep ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </CardHeader>

            <CardContent className="min-h-[300px]">
              {renderStepContent()}
            </CardContent>

            <div className="flex justify-between p-6 pt-0">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Previous
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Submit Consultation
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Next Step <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* Service Promise Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to Begin? Our Promise to You
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">✓</Badge>
                  <div>
                    <h3 className="font-semibold text-gray-900">Beautiful UI Mockups</h3>
                    <p className="text-gray-600">Pixel-perfect designs that showcase your vision</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">✓</Badge>
                  <div>
                    <h3 className="font-semibold text-gray-900">Mock Data Integration</h3>
                    <p className="text-gray-600">Realistic content that demonstrates functionality</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">✓</Badge>
                  <div>
                    <h3 className="font-semibold text-gray-900">Clear Development Vision</h3>
                    <p className="text-gray-600">Functionally sound roadmap for implementation</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="h-64 rounded-lg flex items-center justify-center text-white relative overflow-hidden"
              style={{ background: 'var(--gradient-purple)' }}
            >
              <div className="text-center z-10">
                <h3 className="text-2xl font-bold mb-2">READY TO HIGHLIGHTS</h3>
                <p className="text-lg opacity-90">Transform your ideas today</p>
                <Button
                  size="lg"
                  className="mt-4 bg-white text-purple-600 hover:bg-gray-100"
                  onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  GET STARTED NOW
                </Button>
              </div>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-lg rotate-12"></div>
                <div className="absolute top-16 right-8 w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-8 left-12 w-16 h-16 bg-white/20 rounded-lg rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">MVP PROTOTYPE</span>
              </div>
              <p className="text-gray-400 mb-4">
                Transform your digital vision into functionally sound, beautiful prototypes that drive results.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#solutions" className="hover:text-white">About</a></li>
                <li><a href="#consultation" className="hover:text-white">Services</a></li>
                <li><a href="#portfolio" className="hover:text-white">Portfolio</a></li>
                <li><a href="#blog" className="hover:text-white">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li>hello@mvpprototype.com</li>
                <li>+1 (555) 123-4567</li>
                <li>San Francisco, CA</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MVP Prototype. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}