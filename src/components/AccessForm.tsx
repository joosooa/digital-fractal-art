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
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: 'linear-gradient(-45deg, #fef7f0, #f5f0ff, #f0f7fe, #fff5f5, #f7fef0)',
          backgroundSize: '400% 400%',
        }}
      />
      
      {/* Floating blobs for depth */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full animate-float-blob opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(230,0,126,0.08) 0%, transparent 70%)',
          top: '-10%',
          right: '-10%',
        }}
      />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full animate-float-blob opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(180,200,255,0.15) 0%, transparent 70%)',
          bottom: '-15%',
          left: '-10%',
          animationDelay: '-7s',
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full animate-float-blob opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(200,255,200,0.12) 0%, transparent 70%)',
          top: '40%',
          left: '60%',
          animationDelay: '-14s',
        }}
      />

      {/* Glass overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'rgba(255,255,255,0.4)',
          backdropFilter: 'blur(60px)',
        }}
      />

      <button 
        onClick={onClose}
        className="absolute top-8 right-8 z-10 text-neutral-400 hover:text-neutral-800 transition-all duration-300 text-sm font-medium tracking-wide"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        닫기 ✕
      </button>
      
      <div className="w-full max-w-2xl px-8 py-12">
        <div className="text-center mb-12">
          <h1 
            className="text-3xl md:text-5xl font-semibold text-neutral-900 mb-6 leading-tight"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
          >
            글로벌 K-Food 인텔리전스에
            <br />
            <span className="text-primary">먼저 접근하세요</span>
          </h1>
          <p 
            className="text-base md:text-lg text-neutral-500 max-w-md mx-auto font-light"
            style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}
          >
            YOFLÉ는 글로벌 식품 트렌드가 어디서 형성되고 있는지,
            <br className="hidden md:block" />
            그리고 어떻게 대응해야 하는지 알려드립니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label 
                htmlFor="companyName" 
                className="text-neutral-600 text-sm font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                회사명
              </Label>
              <Input
                id="companyName"
                placeholder="CJ 제일제당"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="bg-white/70 backdrop-blur-sm border-neutral-200/80 text-neutral-900 placeholder:text-neutral-400 h-12 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>
            
            <div className="space-y-2">
              <Label 
                htmlFor="workEmail" 
                className="text-neutral-600 text-sm font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                업무용 이메일
              </Label>
              <Input
                id="workEmail"
                type="email"
                placeholder="name@company.com"
                value={formData.workEmail}
                onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                className="bg-white/70 backdrop-blur-sm border-neutral-200/80 text-neutral-900 placeholder:text-neutral-400 h-12 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>
            
            <div className="space-y-2">
              <Label 
                className="text-neutral-600 text-sm font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                직무
              </Label>
              <Select onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger 
                  className="bg-white/70 backdrop-blur-sm border-neutral-200/80 text-neutral-900 h-12 rounded-xl focus:ring-2 focus:ring-primary/20"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <SelectValue placeholder="직무를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="executive">경영진</SelectItem>
                  <SelectItem value="marketing">마케팅</SelectItem>
                  <SelectItem value="product">제품개발</SelectItem>
                  <SelectItem value="research">연구개발</SelectItem>
                  <SelectItem value="other">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label 
                className="text-neutral-600 text-sm font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                관심 지역
              </Label>
              <Select onValueChange={(value) => setFormData({ ...formData, region: value })}>
                <SelectTrigger 
                  className="bg-white/70 backdrop-blur-sm border-neutral-200/80 text-neutral-900 h-12 rounded-xl focus:ring-2 focus:ring-primary/20"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <SelectValue placeholder="지역을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia">아시아</SelectItem>
                  <SelectItem value="europe">유럽</SelectItem>
                  <SelectItem value="north-america">북미</SelectItem>
                  <SelectItem value="south-america">남미</SelectItem>
                  <SelectItem value="global">글로벌</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button 
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-10 h-12 rounded-xl text-base font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              액세스 신청하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              type="button"
              variant="outline"
              className="border-neutral-300 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-400 px-10 h-12 rounded-xl text-base font-medium backdrop-blur-sm transition-all duration-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              샘플 리포트 보기
            </Button>
          </div>
        </form>

        {/* Trust indicators */}
        <div className="mt-12 pt-8 border-t border-neutral-200/50">
          <p 
            className="text-center text-sm text-neutral-400 font-light"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            CJ 제일제당, 농심, 오뚜기 등 국내 주요 식품 기업이 함께합니다
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessForm;
