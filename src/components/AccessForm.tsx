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
import { ArrowRight, TrendingUp, Globe } from 'lucide-react';

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
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const inputBaseClass = `
    bg-white/60 backdrop-blur-md border-neutral-200/60 text-neutral-900 
    placeholder:text-neutral-400 h-14 rounded-2xl 
    transition-all duration-500 ease-out
    hover:bg-white/80 hover:border-neutral-300/80
    focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/40 
    focus:shadow-lg focus:shadow-primary/5
    focus:scale-[1.02] focus:-translate-y-0.5
  `;

  return (
    <div 
      data-scrollable="form"
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Full coverage white background - extends beyond viewport */}
      <div 
        className="absolute inset-0"
        style={{
          background: '#fafafa',
          minHeight: '200vh',
        }}
      />
      
      {/* Very subtle ambient glow */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, hsl(330, 100%, 50%) 0%, transparent 70%)',
          top: '10%',
          right: '-20%',
          pointerEvents: 'none',
        }}
      />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.02]"
        style={{
          background: 'radial-gradient(circle, hsl(220, 100%, 70%) 0%, transparent 70%)',
          bottom: '20%',
          left: '-15%',
          pointerEvents: 'none',
        }}
      />
      {/* Close button */}
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-20 text-neutral-400 hover:text-neutral-800 transition-all duration-300 text-sm font-medium tracking-wide hover:scale-110"
      >
        ✕
      </button>
      
      {/* Content wrapper with proper centering */}
      <div className="relative min-h-screen flex items-start justify-center pt-20 pb-32">
        <div className="relative z-10 w-full max-w-2xl px-8 py-12 pb-48">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 
            className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-6 leading-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            글로벌 K-Food 인텔리전스에
            <br />
            <span className="bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
              먼저 접근하세요
            </span>
          </h1>
          <p className="text-base md:text-lg text-neutral-500 max-w-lg mx-auto font-light leading-relaxed">
            YOFLÉ는 글로벌 식품 트렌드가 어디서 형성되고 있는지,
            <br className="hidden md:block" />
            그리고 어떻게 대응해야 하는지 알려드립니다.
          </p>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-neutral-200/50">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-neutral-600">실시간 트렌드 분석</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-neutral-200/50">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-sm text-neutral-600">40+ 국가 커버리지</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label 
                htmlFor="companyName" 
                className={`text-sm font-medium transition-colors duration-300 ${
                  focusedField === 'companyName' ? 'text-primary' : 'text-neutral-500'
                }`}
              >
                회사명
              </Label>
              <Input
                id="companyName"
                placeholder="CJ 제일제당"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                onFocus={() => setFocusedField('companyName')}
                onBlur={() => setFocusedField(null)}
                className={inputBaseClass}
              />
            </div>
            
            <div className="space-y-2">
              <Label 
                htmlFor="workEmail" 
                className={`text-sm font-medium transition-colors duration-300 ${
                  focusedField === 'workEmail' ? 'text-primary' : 'text-neutral-500'
                }`}
              >
                업무용 이메일
              </Label>
              <Input
                id="workEmail"
                type="email"
                placeholder="name@company.com"
                value={formData.workEmail}
                onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                onFocus={() => setFocusedField('workEmail')}
                onBlur={() => setFocusedField(null)}
                className={inputBaseClass}
              />
            </div>
            
            <div className="space-y-2">
              <Label 
                className={`text-sm font-medium transition-colors duration-300 ${
                  focusedField === 'role' ? 'text-primary' : 'text-neutral-500'
                }`}
              >
                직무
              </Label>
              <Select 
                onValueChange={(value) => setFormData({ ...formData, role: value })}
                onOpenChange={(open) => setFocusedField(open ? 'role' : null)}
              >
                <SelectTrigger 
                  className={`${inputBaseClass} ${focusedField === 'role' ? 'scale-[1.02] -translate-y-0.5 bg-white ring-4 ring-primary/10 border-primary/40 shadow-lg shadow-primary/5' : ''}`}
                >
                  <SelectValue placeholder="직무를 선택해주세요" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-neutral-200/60 bg-white/95 backdrop-blur-xl">
                  <SelectItem value="executive" className="rounded-lg">경영진</SelectItem>
                  <SelectItem value="marketing" className="rounded-lg">마케팅</SelectItem>
                  <SelectItem value="product" className="rounded-lg">제품개발</SelectItem>
                  <SelectItem value="research" className="rounded-lg">연구개발</SelectItem>
                  <SelectItem value="sales" className="rounded-lg">영업</SelectItem>
                  <SelectItem value="other" className="rounded-lg">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label 
                className={`text-sm font-medium transition-colors duration-300 ${
                  focusedField === 'region' ? 'text-primary' : 'text-neutral-500'
                }`}
              >
                관심 지역
              </Label>
              <Select 
                onValueChange={(value) => setFormData({ ...formData, region: value })}
                onOpenChange={(open) => setFocusedField(open ? 'region' : null)}
              >
                <SelectTrigger 
                  className={`${inputBaseClass} ${focusedField === 'region' ? 'scale-[1.02] -translate-y-0.5 bg-white ring-4 ring-primary/10 border-primary/40 shadow-lg shadow-primary/5' : ''}`}
                >
                  <SelectValue placeholder="지역을 선택해주세요" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-neutral-200/60 bg-white/95 backdrop-blur-xl">
                  <SelectItem value="asia" className="rounded-lg">아시아</SelectItem>
                  <SelectItem value="europe" className="rounded-lg">유럽</SelectItem>
                  <SelectItem value="north-america" className="rounded-lg">북미</SelectItem>
                  <SelectItem value="south-america" className="rounded-lg">남미</SelectItem>
                  <SelectItem value="middle-east" className="rounded-lg">중동</SelectItem>
                  <SelectItem value="global" className="rounded-lg">글로벌 전체</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              type="submit"
              className="relative overflow-hidden bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 text-white px-12 h-14 rounded-2xl text-base font-semibold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 hover:-translate-y-1 transition-all duration-500"
            >
              <span className="relative z-10 flex items-center">
                액세스 신청하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
            <Button 
              type="button"
              variant="outline"
              className="border-neutral-200/80 bg-white/50 text-neutral-700 hover:bg-white hover:border-neutral-300 hover:scale-105 px-10 h-14 rounded-2xl text-base font-medium backdrop-blur-sm transition-all duration-500"
            >
              샘플 리포트 보기
            </Button>
          </div>
        </form>

        {/* Removed trust indicators per request */}
        </div>
      </div>
    </div>
  );
};

export default AccessForm;
