import { useState } from 'react';
import Icon from '@/components/ui/icon';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/f9f7dc38-52c4-41d5-9c9f-197b14c58636/files/2213f419-ffd1-4f13-98f1-4db7a16f2731.jpg';
const ROBOT_IMG =
  'https://cdn.poehali.dev/projects/f9f7dc38-52c4-41d5-9c9f-197b14c58636/files/6e5ce225-0040-48f0-aea4-2b03c59edca2.jpg';

const NAV = [
  { id: 'about', label: 'О кружке' },
  { id: 'programs', label: 'Программа' },
  { id: 'projects', label: 'Проекты' },
  { id: 'schedule', label: 'Расписание' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'news', label: 'Новости' },
  { id: 'contacts', label: 'Контакты' },
];

const PROGRAMS = [
  { icon: 'Bot', title: 'Робототехника', desc: 'Сборка и программирование роботов на Arduino и LEGO Mindstorms', level: '8–16 лет', color: 'primary' },
  { icon: 'Code2', title: 'Программирование', desc: 'Python, Scratch, разработка игр и мобильных приложений', level: '10–17 лет', color: 'secondary' },
  { icon: 'Box', title: '3D-моделирование', desc: 'Tinkercad, Blender и печать на 3D-принтере', level: '9–16 лет', color: 'accent' },
  { icon: 'Cpu', title: 'Электроника', desc: 'Микросхемы, пайка, умные устройства и IoT', level: '11–17 лет', color: 'primary' },
  { icon: 'Rocket', title: 'Инженерия', desc: 'Проектирование, физика, аэрокосмические эксперименты', level: '12–17 лет', color: 'secondary' },
  { icon: 'Palette', title: 'Цифровое искусство', desc: 'Графика, анимация и креативные технологии', level: '8–15 лет', color: 'accent' },
];

const PROJECTS = [
  { title: 'Робот-сортировщик', author: 'Команда «Квант»', tag: 'Робототехника' },
  { title: 'Метеостанция IoT', author: 'Артём, 14 лет', tag: 'Электроника' },
  { title: 'Игра «Космос»', author: 'Соня, 12 лет', tag: 'Программирование' },
  { title: 'Протез-манипулятор', author: 'Команда «Бионика»', tag: 'Инженерия' },
];

const SCHEDULE = [
  { day: 'ПН', time: '16:00 — 17:30', course: 'Робототехника', group: 'Junior', seats: 3 },
  { day: 'ВТ', time: '17:00 — 18:30', course: 'Программирование Python', group: 'Middle', seats: 5 },
  { day: 'СР', time: '16:00 — 17:30', course: '3D-моделирование', group: 'Junior', seats: 2 },
  { day: 'ЧТ', time: '17:00 — 19:00', course: 'Электроника и IoT', group: 'Senior', seats: 4 },
  { day: 'ПТ', time: '16:30 — 18:00', course: 'Инженерия', group: 'Middle', seats: 6 },
  { day: 'СБ', time: '11:00 — 13:00', course: 'Цифровое искусство', group: 'All', seats: 8 },
];

const NEWS = [
  { date: '18 июня', title: 'Победа на городском хакатоне', desc: 'Наша команда заняла 1 место с проектом умной теплицы.', tag: 'Достижения' },
  { date: '05 июня', title: 'Новый 3D-принтер в лаборатории', desc: 'Установили высокоточный принтер для сложных моделей.', tag: 'Оборудование' },
  { date: '22 мая', title: 'Открыт набор на летнюю смену', desc: 'Интенсив по робототехнике и программированию весь июль.', tag: 'Набор' },
];

const GALLERY = [
  { label: 'Робот-манипулятор', span: 'row-span-2' },
  { label: 'Печатная плата', span: '' },
  { label: '3D-печать', span: '' },
  { label: 'Командная сборка', span: '' },
  { label: 'Дрон проект', span: 'row-span-2' },
  { label: 'Презентация', span: '' },
];

function EnrollForm({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(1);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена! 🚀',
      description: 'Мы свяжемся с вами в течение дня для подтверждения записи.',
    });
    onDone();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="flex gap-2 mb-2">
        {[1, 2].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors ${
              step >= s ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {step === 1 ? (
        <>
          <div className="space-y-1.5">
            <Label className="font-mono-tech text-xs uppercase tracking-widest text-primary">Имя ученика</Label>
            <Input required placeholder="Как зовут ребёнка?" className="bg-muted/50 border-border" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="font-mono-tech text-xs uppercase tracking-widest text-primary">Возраст</Label>
              <Input required type="number" min={6} max={18} placeholder="12" className="bg-muted/50 border-border" />
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono-tech text-xs uppercase tracking-widest text-primary">Класс</Label>
              <Input placeholder="6 класс" className="bg-muted/50 border-border" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="font-mono-tech text-xs uppercase tracking-widest text-primary">Направление</Label>
            <Select>
              <SelectTrigger className="bg-muted/50 border-border">
                <SelectValue placeholder="Выберите курс" />
              </SelectTrigger>
              <SelectContent>
                {PROGRAMS.map((p) => (
                  <SelectItem key={p.title} value={p.title}>{p.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="button" onClick={() => setStep(2)} className="w-full font-display tracking-wide text-base h-12">
            Далее <Icon name="ArrowRight" size={18} className="ml-1" />
          </Button>
        </>
      ) : (
        <>
          <div className="space-y-1.5">
            <Label className="font-mono-tech text-xs uppercase tracking-widest text-primary">Имя родителя</Label>
            <Input required placeholder="Ваше имя" className="bg-muted/50 border-border" />
          </div>
          <div className="space-y-1.5">
            <Label className="font-mono-tech text-xs uppercase tracking-widest text-primary">Телефон</Label>
            <Input required type="tel" placeholder="+7 (___) ___-__-__" className="bg-muted/50 border-border" />
          </div>
          <div className="space-y-1.5">
            <Label className="font-mono-tech text-xs uppercase tracking-widest text-primary">Email</Label>
            <Input type="email" placeholder="you@mail.ru" className="bg-muted/50 border-border" />
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => setStep(1)} className="h-12">
              <Icon name="ArrowLeft" size={18} />
            </Button>
            <Button type="submit" className="flex-1 font-display tracking-wide text-base h-12 box-glow">
              Записаться <Icon name="Sparkles" size={18} className="ml-1" />
            </Button>
          </div>
        </>
      )}
    </form>
  );
}

const Index = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const EnrollButton = ({ className = '', label = 'Записаться' }: { className?: string; label?: string }) => (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={`font-display tracking-wide ${className}`}>
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border-primary/30 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl uppercase gradient-text">
            Запись на занятия
          </DialogTitle>
        </DialogHeader>
        <EnrollForm onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* Animated background orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] rounded-full bg-primary/20 blur-[120px]" style={{ animation: 'float-orb 18s ease-in-out infinite' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-secondary/20 blur-[120px]" style={{ animation: 'float-orb 22s ease-in-out infinite reverse' }} />
        <div className="absolute top-[40%] left-[50%] w-[25rem] h-[25rem] rounded-full bg-accent/10 blur-[100px]" style={{ animation: 'float-orb 26s ease-in-out infinite' }} />
        <div className="absolute inset-0 grid-bg opacity-40" style={{ animation: 'grid-move 8s linear infinite' }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 glass">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/40 flex items-center justify-center box-glow">
              <Icon name="Atom" size={20} className="text-primary" />
            </div>
            <span className="font-display text-xl font-bold tracking-widest">NEXUS</span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <EnrollButton className="hidden sm:inline-flex box-glow" />
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2">
              <Icon name={menuOpen ? 'X' : 'Menu'} size={24} className="text-primary" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="lg:hidden glass border-t border-border animate-fade-in">
            <div className="container py-3 flex flex-col">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  className="py-3 text-left text-muted-foreground hover:text-primary transition-colors"
                >
                  {n.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex items-center pt-16">
        <div className="container grid lg:grid-cols-2 gap-12 items-center py-16">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 mb-6 font-mono-tech text-xs uppercase tracking-widest text-primary">
              <span className="w-2 h-2 rounded-full bg-primary" style={{ animation: 'pulse-glow 1.5s infinite' }} />
              Набор открыт · сезон 2026
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] mb-6">
              Инженеры
              <br />
              <span className="gradient-text text-glow">будущего</span>
              <br />
              стартуют здесь
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
              STEAM-кружок NEXUS — место, где школьники собирают роботов, пишут код
              и печатают свои идеи на 3D-принтере.
            </p>
            <div className="flex flex-wrap gap-4">
              <EnrollButton className="h-13 px-8 text-base box-glow" label="Записаться на занятие" />
              <Button
                variant="outline"
                onClick={() => scrollTo('programs')}
                className="h-13 px-8 text-base font-display tracking-wide border-primary/40"
              >
                Программа обучения
              </Button>
            </div>

            <div className="flex gap-8 mt-12">
              {[
                { v: '320+', l: 'учеников' },
                { v: '14', l: 'направлений' },
                { v: '8', l: 'лет опыта' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl font-bold text-primary">{s.v}</div>
                  <div className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="relative rounded-2xl overflow-hidden border border-primary/30 box-glow">
              <img src={HERO_IMG} alt="STEAM лаборатория" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 -left-5 glass rounded-xl p-4 flex items-center gap-3 box-glow">
              <Icon name="Cpu" size={28} className="text-primary" />
              <div>
                <div className="font-display font-bold leading-tight">Своя лаборатория</div>
                <div className="font-mono-tech text-xs text-muted-foreground">оборудование 2026</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" eyebrow="// О кружке" title="Учимся, создавая">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: 'Lightbulb', title: 'Практика с первого дня', desc: 'Никакой скучной теории — сразу собираем, паяем и программируем настоящие устройства.' },
            { icon: 'Users', title: 'Малые группы', desc: 'До 8 человек в группе. Каждый ученик под вниманием наставника.' },
            { icon: 'Trophy', title: 'Хакатоны и конкурсы', desc: 'Участвуем в олимпиадах и соревнованиях по робототехнике и IT.' },
          ].map((c, i) => (
            <div key={c.title} className="glass rounded-2xl p-7 hover:-translate-y-1 hover:box-glow transition-all duration-300" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-5">
                <Icon name={c.icon} size={24} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{c.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Programs */}
      <Section id="programs" eyebrow="// Программа обучения" title="6 направлений">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROGRAMS.map((p) => (
            <div key={p.title} className="group glass rounded-2xl p-6 hover:-translate-y-1 hover:border-primary/40 transition-all duration-300">
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:box-glow transition-all">
                  <Icon name={p.icon} size={28} className="text-primary" />
                </div>
                <span className="font-mono-tech text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground">{p.level}</span>
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" eyebrow="// Проекты учеников" title="Что создают наши ребята">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECTS.map((p, i) => (
            <div key={p.title} className="group relative rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 aspect-[3/4]">
              <img src={ROBOT_IMG} alt={p.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" style={{ filter: `hue-rotate(${i * 60}deg)` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5">
                <span className="font-mono-tech text-[10px] uppercase tracking-widest text-primary">{p.tag}</span>
                <h3 className="font-display text-xl font-semibold mt-1">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.author}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Schedule */}
      <Section id="schedule" eyebrow="// Расписание занятий" title="Когда приходить">
        <div className="glass rounded-2xl overflow-hidden">
          {SCHEDULE.map((s, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center px-5 py-4 border-b border-border last:border-0 hover:bg-primary/5 transition-colors">
              <div className="col-span-2 sm:col-span-1">
                <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center font-display font-bold text-primary">{s.day}</div>
              </div>
              <div className="col-span-4 sm:col-span-3 font-mono-tech text-sm text-muted-foreground">{s.time}</div>
              <div className="col-span-6 sm:col-span-4 font-display font-semibold">{s.course}</div>
              <div className="hidden sm:block sm:col-span-2 font-mono-tech text-xs text-muted-foreground">{s.group}</div>
              <div className="col-span-12 sm:col-span-2 flex justify-start sm:justify-end mt-2 sm:mt-0">
                <span className={`font-mono-tech text-xs px-3 py-1 rounded-full ${s.seats <= 3 ? 'bg-accent/15 text-accent border border-accent/30' : 'bg-primary/10 text-primary border border-primary/30'}`}>
                  {s.seats} мест
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <EnrollButton className="h-12 px-8 box-glow" label="Забронировать место" />
        </div>
      </Section>

      {/* Gallery */}
      <Section id="gallery" eyebrow="// Галерея работ" title="Атмосфера лаборатории">
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-4">
          {GALLERY.map((g, i) => (
            <div key={i} className={`group relative rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all ${g.span}`}>
              <img src={i % 2 ? HERO_IMG : ROBOT_IMG} alt={g.label} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" style={{ filter: `hue-rotate(${i * 40}deg)` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <span className="absolute bottom-3 left-4 font-mono-tech text-xs uppercase tracking-wider text-foreground">{g.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* News */}
      <Section id="news" eyebrow="// Новости и события" title="Что нового">
        <div className="grid md:grid-cols-3 gap-5">
          {NEWS.map((n) => (
            <article key={n.title} className="glass rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-tech text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">{n.tag}</span>
                <span className="font-mono-tech text-xs text-muted-foreground">{n.date}</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{n.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">{n.desc}</p>
              <button className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all">
                Читать <Icon name="ArrowRight" size={16} />
              </button>
            </article>
          ))}
        </div>
      </Section>

      {/* Contacts + Enroll CTA */}
      <Section id="contacts" eyebrow="// Контакты и запись" title="Присоединяйтесь к NEXUS">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-8 box-glow">
            <h3 className="font-display text-2xl font-semibold mb-2 gradient-text">Записаться на пробное занятие</h3>
            <p className="text-muted-foreground text-sm mb-6">Заполните форму — и мы подберём направление и удобное время.</p>
            <EnrollForm onDone={() => {}} />
          </div>

          <div className="space-y-4">
            {[
              { icon: 'MapPin', title: 'Адрес', val: 'г. Москва, ул. Технологическая, 12, каб. 305' },
              { icon: 'Phone', title: 'Телефон', val: '+7 (495) 123-45-67' },
              { icon: 'Mail', title: 'Email', val: 'hello@nexus-steam.ru' },
              { icon: 'Clock', title: 'Часы работы', val: 'Пн–Сб · 15:00 — 20:00' },
            ].map((c) => (
              <div key={c.title} className="glass rounded-xl p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <Icon name={c.icon} size={22} className="text-primary" />
                </div>
                <div>
                  <div className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground">{c.title}</div>
                  <div className="font-medium">{c.val}</div>
                </div>
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              {['Send', 'MessageCircle', 'Youtube', 'Instagram'].map((s) => (
                <button key={s} className="w-11 h-11 rounded-lg glass flex items-center justify-center hover:box-glow hover:text-primary transition-all">
                  <Icon name={s} size={20} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/40 flex items-center justify-center">
              <Icon name="Atom" size={18} className="text-primary" />
            </div>
            <span className="font-display font-bold tracking-widest">NEXUS</span>
          </div>
          <p className="font-mono-tech text-xs text-muted-foreground">© 2026 STEAM-кружок NEXUS · Инженеры будущего</p>
        </div>
      </footer>
    </div>
  );
};

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-20 scroll-mt-16">
      <div className="container">
        <div className="mb-10">
          <span className="font-mono-tech text-sm uppercase tracking-widest text-primary">{eyebrow}</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase mt-2">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

export default Index;
