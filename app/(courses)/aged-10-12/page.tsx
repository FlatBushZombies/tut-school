"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Info, Landmark, Clock, Calendar, Phone, Mail, ChevronDown, X, Menu, Globe, FileText, Award, MessageCircle, BookOpen
} from "lucide-react"
import { FadeIn } from "@/components/animations/scroll-animations"

// Types
type Language = "ru" | "en"
type DropdownItem = { title: string; href: string }
type ScheduleItem = { day: string; times: string[] }
type Activity = { title: string; description: string; image: string }
type Benefit = { title: string; description: string }

// Constants
const SOCIAL_LINKS = [
  {
    name: "Viber",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.052-1.713-1.033-1.033-1.49-1.172-1.744-1.172-.356 0-.458.102-.458.593v1.573c0 .424-.136.593-1.252.593-1.844 0-3.896-1.118-5.336-3.202-2.168-3.4-2.762-5.944-2.762-6.47 0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.864 2.5 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.316c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.204.508.66v3.54c0 .373.17.508.271.508.22 0 .407-.135.814-.542 1.27-1.422 2.168-3.624 2.168-3.624.118-.254.305-.491.745-.491h1.744c.525 0 .644.27.525.66-.22 1.015-2.32 3.979-2.32 3.979-.186.305-.254.44 0 .78.186.254.796.779 1.2 1.252.745.847 1.32 1.558 1.473 2.052.17.491-.085.745-.576.745z" />
      </svg>
    ),
    color: "text-red-600 hover:text-red-800"
  },
  {
    name: "WhatsApp",
    href: "https://api.whatsapp.com/send/?phone=%2B79167349246&text&type=phone_number&app_absent=0",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.472 3.5C18.188 1.24 15.073 0 11.786 0 5.354 0 .13 5.214.13 11.636c0 2.05.546 4.05 1.585 5.812L.13 24l6.726-1.763c1.698.925 3.607 1.41 5.55 1.41h.005c6.43 0 11.65-5.215 11.65-11.637 0-3.109-1.21-6.026-3.413-8.225l-.175-.285zM11.786 21.273h-.004c-1.743 0-3.45-.468-4.942-1.35l-.355-.21-3.676.964.985-3.595-.232-.368c-.975-1.55-1.49-3.335-1.49-5.17 0-5.356 4.364-9.713 9.728-9.713 2.6 0 5.034 1.012 6.868 2.85 1.832 1.837 2.842 4.276 2.84 6.873-.004 5.356-4.367 9.719-9.722 9.719zm5.333-7.278c-.294-.147-1.734-.856-2.002-.951-.268-.097-.463-.146-.658.146-.195.293-.757.951-.928 1.147-.17.195-.342.22-.635.073-.294-.147-1.24-.456-2.363-1.456-.873-.778-1.463-1.738-1.634-2.032-.171-.293-.018-.451.128-.597.132-.132.294-.342.44-.513.148-.17.197-.293.296-.488.098-.195.05-.366-.025-.513-.073-.147-.657-1.583-.9-2.168-.244-.585-.487-.487-.658-.487-.17 0-.367-.025-.562-.025-.195 0-.513.073-.781.366-.269.293-1.025.999-1.025 2.435 0 1.436 1.05 2.824 1.196 3.02.146.195 2.057 3.142 4.988 4.407.697.268 1.24.428 1.664.55.7.222 1.337.19 1.839.115.56-.085 1.734-.71 1.977-1.395.244-.684.244-1.27.17-1.393-.073-.122-.268-.196-.562-.342z" />
      </svg>
    ),
    color: "text-green-600 hover:text-green-800"
  },
  {
    name: "Telegram",
    href: "https://t.me/TUTschoolNovogorsk",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.534.26l.193-2.98 5.518-4.99c.22-.196-.048-.307-.338-.11l-6.81 4.29-2.96-.92c-.64-.203-.658-.64.135-.954l11.57-4.46c.538-.196 1.006.128.832.941z" />
      </svg>
    ),
    color: "text-blue-500 hover:text-blue-700"
  }
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Aged10to12Page() {
  // State
  const [language, setLanguage] = useState<Language>("ru")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Refs
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Translations
  const translations = {
    ru: {
      schoolName: "Tut School",
      schoolSubtitle: "Курсы иностранных языков, Школа искусств",
      phone: "+7 (983) 600-00-00",
      email: "info@tut-school.ru",
      address: "Московская область, Химки, микрорайон Новогорск, Заречная улица, 5, корп. 2",
      rating: "4.8 на Яндексе",
      search: "Поиск",
      workingHours: "Пн-Пт: 9:00-21:00, Сб: 10:00-18:00",
      promo: "Запишитесь на пробный урок до 30 мая и получите скидку 20% на первый месяц обучения!",
      nav: {
        about: "О ШКОЛЕ",
        aboutDropdown: [
          { title: "НАШИ ЦЕННОСТИ", href: "/our-values" },
          { title: "РАСПИСАНИЕ И ЦЕНЫ", href: "/schedule" },
          { title: "ПРЕПОДАВАТЕЛИ", href: "/teachers" },
        ],
        courses: "КУРСЫ АНГЛИЙСКОГО",
        coursesDropdown: [
          { title: "ДОШКОЛЬНИКИ", href: "/preschoolers" },
          { title: "ДЕТИ 7-9 ЛЕТ", href: "/aged-7-9" },
          { title: "ДЕТИ 10-12 ЛЕТ", href: "/aged-10-12" },
          { title: "ПОДРОСТКИ", href: "/teenagers" },
          { title: "ВЗРОСЛЫЕ", href: "/adults" },
        ],
        chinese: "КУРСЫ КИТАЙСКОГО",
        chineseDropdown: [
          { title: "ДОШКОЛЬНИКИ", href: "/chinese/preschoolers" },
          { title: "ДЕТИ 7-9 ЛЕТ", href: "/chinese/aged-7-9" },
          { title: "ДЕТИ 10-12 ЛЕТ", href: "/chinese/aged-10-12" },
          { title: "ПОДРОСТКИ", href: "/chinese/teenagers" },
          { title: "ВЗРОСЛЫЕ", href: "/chinese/adults" },
        ],
        club: "РАЗГОВОРНЫЙ КЛУБ",
        clubDropdown: [
          { title: "ПОДРОСТКИ", href: "/conversation-club/teenagers" },
          { title: "ВЗРОСЛЫЕ", href: "/conversation-club/adults" },
        ],
        masterclass: "МАСТЕР-КЛАССЫ",
        masterclassDropdown: [
          { title: "КИТАЙСКАЯ КАЛЛИГРАФИЯ", href: "/chinese-calligraphy" },
          { title: "ТВОРЧЕСКИЕ МАСТЕР-КЛАССЫ", href: "/creative-workshops" },
        ],
        news: "НОВОСТИ",
        contacts: "КОНТАКТЫ",
      },
      hero: {
        title: "Английский для детей 10-12 лет",
        subtitle: "Углубленное изучение английского языка. Развитие критического мышления и уверенности в общении.",
        cta: "Записаться на пробный урок",
      },
      benefits: [
        { title: "Углубленная программа", description: "Подготовка к международным экзаменам, интегрированная в курс" },
        { title: "Актуальные темы", description: "Современный язык на примере диалогов из реальной жизни" },
        { title: "Квалифицированные преподаватели", description: "Специалисты с опытом преподавания по коммуникативной методике" },
        { title: "Современные технологии", description: "Использование цифровых ресурсов и интерактивных платформ" },
      ],
      activities: [
        { title: "Работа в парах и группах", description: "Развитие диалогической речи, навыков аргументации и критического мышления", image: "https://images.pexels.com/photos/8457438/pexels-photo-8457438.jpeg" },
        { title: "Проектная работа", description: "Создание презентаций и исследовательских проектов на английском", image: "https://images.pexels.com/photos/7869800/pexels-photo-7869800.jpeg" },
        { title: "Расширение кругозора", description: "Контент, расширяющий как общие знания о мире, так и о культуре англоязычных стран", image: "https://images.pexels.com/photos/8612989/pexels-photo-8612989.jpeg?" },
      ],
      schedule: [
        { day: "Вторник", times: ["9:00 - 10:00"] },
        { day: "Четверг", times: ["9:00 - 10:00"] },
        
      ],
      languageToggle: "English",
    },
    en: {
      schoolName: "Tut School",
      schoolSubtitle: "Foreign Language Courses, School of Arts",
      phone: "+7 (983) 600-00-00",
      email: "info@tut-school.ru",
      address: "Moscow region, Khimki, Novogorsk district, Zarechnaya street, 5, building 2",
      rating: "4.8 on Yandex",
      search: "Search",
      workingHours: "Mon-Fri: 9:00-21:00, Sat: 10:00-18:00",
      promo: "Sign up for a trial lesson before May 30 and get a 20% discount on your first month of study!",
      nav: {
        about: "ABOUT THE SCHOOL",
        aboutDropdown: [
          { title: "OUR VALUES", href: "/our-values" },
          { title: "SCHEDULE AND PRICES", href: "/schedule" },
          { title: "TEACHERS", href: "/teachers" },
        ],
        courses: "ENGLISH COURSES",
        coursesDropdown: [
          { title: "PRESCHOOLERS", href: "/preschoolers" },
          { title: "CHILDREN AGED 7-9", href: "/aged-7-9" },
          { title: "CHILDREN AGED 10-12", href: "/aged-10-12" },
          { title: "TEENAGERS", href: "/teenagers" },
          { title: "ADULTS", href: "/adults" },
        ],
        chinese: "CHINESE LANGUAGE COURSES",
        chineseDropdown: [
          { title: "PRESCHOOLERS", href: "/chinese/preschoolers" },
          { title: "CHILDREN AGED 7-9", href: "/chinese/aged-7-9" },
          { title: "CHILDREN AGED 10-12", href: "/chinese/aged-10-12" },
          { title: "TEENAGERS", href: "/chinese/teenagers" },
          { title: "ADULTS", href: "/chinese/adults" },
        ],
        club: "CONVERSATION CLUB",
        clubDropdown: [
          { title: "TEENAGERS", href: "/conversation-club/teenagers" },
          { title: "ADULTS", href: "/conversation-club/adults" },
        ],
        masterclass: "MASTERCLASS",
        masterclassDropdown: [
          { title: "CHINESE CALLIGRAPHY", href: "/chinese-calligraphy" },
          { title: "CREATIVE WORKSHOP", href: "/creative-workshops" },
        ],
        news: "NEWS",
        contacts: "CONTACTS",
      },
      hero: {
        title: "English for children aged 10-12",
        subtitle: "Advanced English language learning. Development of critical thinking and confidence in communication.",
        cta: "Book a trial lesson",
      },
      benefits: [
        { title: "Advanced Programs", description: " Includes preparation for international exams." },
        { title: "Relevant Topics", description: " Modern language through real-life dialogues." },
        { title: "Qualified teachers", description: "Specialists experienced in the communicative method." },
        { title: "Modern technology", description: "Use of digital resources and interactive platforms" },
      ],
      activities: [
        { title: "Pair and group work", description: "Developing dialogic speech, argumentation, and critical thinking", image: "/debates.jpg" },
        { title: "Project work", description: "Creating presentations and research projects in English", image: "/projects.jpg" },
        { title: "Broadening horizons", description: " content expanding general knowledge and culture of English-speaking countries", image: "/exams.jpg" },
      ],
      schedule: [
        { day: "Tuesday", times: ["9:00 - 10:00"] },
        { day: "Thursday", times: ["9:00 - 10:00"] },
      ],
      languageToggle: "Русский",
    },
  }

  const t = translations[language]

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handlers
  const toggleLanguage = () => setLanguage(language === "ru" ? "en" : "ru")
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const toggleDropdown = (dropdown: string) => setActiveDropdown(activeDropdown === dropdown ? null : dropdown)

  // Components
  const TopBar = () => (
    <div className="bg-gray-100 py-2 text-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-gray-600">{t.workingHours}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            <a href={`tel:${t.phone.replace(/\s+/g, "")}`} className="text-gray-600 hover:text-primary">
              {t.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Landmark className="h-4 w-4 text-primary" />
            <span className="text-gray-600">{t.address}</span>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Mail className="h-4 w-4 text-primary" />
            <a href={`mailto:${t.email}`} className="text-gray-600 hover:text-primary">
              {t.email}
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map((link, index) => (
            <a
              key={index}
              href={link.href}
              aria-label={link.name}
              className={`${link.color} transition-colors`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
            </a>
          ))}
          <button
            onClick={toggleLanguage}
            className="ml-2 flex items-center gap-1 rounded-md border border-gray-300 px-2 py-1 text-xs hover:bg-gray-200 transition-colors"
            aria-label={`Switch to ${t.languageToggle}`}
          >
            <Globe className="h-3 w-3" />
            {t.languageToggle}
          </button>
        </div>
      </div>
    </div>
  )

  const DesktopNavItem = ({ label, dropdownItems }: { label: string; dropdownItems?: DropdownItem[] }) => {
    const slug = label.toLowerCase().replace(/\s+/g, '-')
    return (
      <li className="relative">
        {dropdownItems ? (
          <>
            <button
              onClick={() => toggleDropdown(slug)}
              className={`flex items-center text-sm font-medium ${
                activeDropdown === slug ? "text-primary" : "text-gray-700 hover:text-primary"
              }`}
              aria-expanded={activeDropdown === slug}
              aria-haspopup="true"
            >
              {label}
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${
                  activeDropdown === slug ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeDropdown === slug && (
              <div className="absolute left-0 top-full z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white py-2 shadow-lg">
                {dropdownItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <Link href={`/${slug}`} className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
            {label}
          </Link>
        )}
      </li>
    )
  }

  const MobileNavItem = ({
    label,
    icon: Icon,
    dropdownItems
  }: {
    label: string
    icon: React.ComponentType<{ className?: string }>
    dropdownItems?: DropdownItem[]
  }) => {
    const slug = `${label.toLowerCase().replace(/\s+/g, '-')}-mobile`
    return (
      <div className="rounded-lg border border-gray-200">
        <button
          onClick={() => toggleDropdown(slug)}
          className="flex w-full items-center justify-between p-4 text-left font-medium text-gray-700"
          aria-expanded={activeDropdown === slug}
        >
          <span className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            {label}
          </span>
          {activeDropdown === slug ? (
            <X className="h-5 w-5 transition-transform" />
          ) : (
            <ChevronDown className="h-5 w-5 transition-transform" />
          )}
        </button>
        {dropdownItems && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              activeDropdown === slug ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="space-y-2 px-4 pb-4">
              {dropdownItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md p-3 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const Header = () => (
    <header
      className={`border-b bg-white shadow-sm transition-all duration-300 ${
        isScrolled ? "fixed top-0 left-0 right-0 z-50 shadow-md" : ""
      }`}
    >
      <TopBar />
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14">
            <Link href="/" aria-label="Home">
              <Image
                src="/logo.png"
                alt={language === "ru" ? "Логотип Tut School" : "Tut School logo"}
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">{t.schoolName}</h1>
            <p className="text-sm text-muted-foreground">{t.schoolSubtitle}</p>
          </div>
        </div>

        <nav className="hidden md:block relative z-50" ref={dropdownRef}>
          <ul className="flex gap-6">
            <DesktopNavItem label={t.nav.about} dropdownItems={t.nav.aboutDropdown} />
            <DesktopNavItem label={t.nav.courses} dropdownItems={t.nav.coursesDropdown} />
            <DesktopNavItem label={t.nav.chinese} dropdownItems={t.nav.chineseDropdown} />
            <DesktopNavItem label={t.nav.club} dropdownItems={t.nav.clubDropdown} />
            <DesktopNavItem label={t.nav.masterclass} dropdownItems={t.nav.masterclassDropdown} />
            <DesktopNavItem label={t.nav.news} />
            <DesktopNavItem label={t.nav.contacts} />
          </ul>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <button
            className="rounded-md p-1 text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "max-h-[calc(100vh-60px)]" : "max-h-0"
        }`}
      >
        <div className="container mx-auto space-y-2 px-4 pb-4">
          <MobileNavItem label={t.nav.about} icon={Info} dropdownItems={t.nav.aboutDropdown} />
          <MobileNavItem label={t.nav.courses} icon={BookOpen} dropdownItems={t.nav.coursesDropdown} />
          <MobileNavItem label={t.nav.chinese} icon={Globe} dropdownItems={t.nav.chineseDropdown} />
          <MobileNavItem label={t.nav.club} icon={MessageCircle} dropdownItems={t.nav.clubDropdown} />
          <MobileNavItem label={t.nav.masterclass} icon={Award} dropdownItems={t.nav.masterclassDropdown} />
          <Link
            href="/news"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 p-4 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FileText className="h-5 w-5 text-primary" />
            {t.nav.news}
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 p-4 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Phone className="h-5 w-5 text-primary" />
            {t.nav.contacts}
          </Link>
        </div>
      </div>
    </header>
  )

  const HeroSection = () => (
    <section className="relative bg-primary py-20 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className="text-center"
        >
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{t.hero.title}</h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">{t.hero.subtitle}</p>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
    </section>
  )

  const BenefitsSection = () => (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          {language === 'ru' ? 'Преимущества' : 'Benefits'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.benefits.map((benefit: Benefit, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-primary"
            >
              <h3 className="text-xl font-semibold mb-3 text-primary">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )

  const ActivitiesSection = () => (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          {language === 'ru' ? 'Наши занятия' : 'Our Activities'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.activities.map((activity: Activity, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">{activity.title}</h3>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )

  const ScheduleSection = () => (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          {language === 'ru' ? 'Расписание занятий' : 'Class Schedule'}
        </h2>
        <div className="max-w-md mx-auto">
          {t.schedule.map((item: ScheduleItem, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
              className="flex justify-between items-center py-4 border-b last:border-b-0"
            >
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-primary mr-2" />
                <span className="font-medium">{item.day}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 text-primary mr-2" />
                <span>{item.times[0]}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )

  const CTASection = () => (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">
          {language === 'ru' ? 'Запишитесь на пробный урок' : 'Book a trial lesson'}
        </h2>
        <p className="text-xl mb-8 opacity-90">
          {t.promo}
        </p>
        <button className="bg-white text-primary px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
          {t.hero.cta}
        </button>
      </div>
    </section>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <FadeIn>
        <Header />
        <main>
          <HeroSection />
          <BenefitsSection />
          <ActivitiesSection />
          <ScheduleSection />
          <CTASection />
        </main>
      </FadeIn>
    </div>
  )
}