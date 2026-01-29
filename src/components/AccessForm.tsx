import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';

interface AccessFormProps {
  onClose: () => void;
}

const AccessForm = ({ onClose }: AccessFormProps) => {
  const [formData, setFormData] = useState({
    companyName: '',
    workEmail: '',
    role: '',
    region: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f5f3f0] animate-fade-in">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-muted-foreground hover:text-foreground transition-colors text-sm tracking-widest"
      >
        CLOSE ✕
      </button>
      
      <div className="w-full max-w-2xl px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            Get early access to global K-Food intelligence
          </h1>
          <p className="text-lg text-[#666] max-w-xl mx-auto">
            YOFLÉ helps brands understand where global food trends are forming — and how to act on them.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-[#1a1a1a] text-sm">
                Company name
              </Label>
              <Input
                id="companyName"
                placeholder="CJ CheilJedang"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="bg-white border-[#e0e0e0] text-[#1a1a1a] placeholder:text-[#999] h-12 rounded-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="workEmail" className="text-[#1a1a1a] text-sm">
                Work email
              </Label>
              <Input
                id="workEmail"
                type="email"
                placeholder="name@company.com"
                value={formData.workEmail}
                onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                className="bg-white border-[#e0e0e0] text-[#1a1a1a] placeholder:text-[#999] h-12 rounded-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-[#1a1a1a] text-sm">Role</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="bg-white border-[#e0e0e0] text-[#1a1a1a] h-12 rounded-lg">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="executive">Executive</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-[#1a1a1a] text-sm">Region of interest</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, region: value })}>
                <SelectTrigger className="bg-white border-[#e0e0e0] text-[#1a1a1a] h-12 rounded-lg">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="north-america">North America</SelectItem>
                  <SelectItem value="south-america">South America</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 rounded-lg text-base font-medium"
            >
              Request access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              type="button"
              variant="outline"
              className="border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white px-8 h-12 rounded-lg text-base font-medium"
            >
              See sample report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccessForm;
