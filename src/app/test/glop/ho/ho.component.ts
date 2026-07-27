import { Component } from '@angular/core';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  route: string;
}

@Component({
  selector: 'app-ho',
  templateUrl: './ho.component.html',
  styleUrl: './ho.component.scss'
})
export class HoComponent {
  projects: Project[] = [
    {
      id: 1,
      title: 'متجر إلكتروني ومتكامل',
      description: 'منصة تسوق متكاملة تدعم الدفع الإلكتروني وإدارة المنتجات.',
      image: 'https://picsum.photos/400/250?random=1',
      category: 'E-Commerce',
      route: '/test1'
    },
    {
      id: 2,
      title: 'تطبيق إدارة المهام',
      description: 'نظام لتنظيم المهام اليومية مع إشعارات ولوحة متابعة الإنجاز.',
      image: 'https://picsum.photos/400/250?random=2',
      category: 'Productivity',
      route: '/test2'
    },
    {
      id: 3,
      title: 'نظام إدارة العيادات',
      description: 'لوحة تحكم لحجز المواعيد وإدارة ملفات المرضى والأطباء.',
      image: 'https://picsum.photos/400/250?random=3',
      category: 'Healthcare',
      route: '/about-us'
    },
    {
      id: 4,
      title: 'منصة تعلم عبر الإنترنت',
      description: 'موقع لمشاهدة الكورسات التفاعلية واجتياز الاختبارات.',
      image: 'https://picsum.photos/400/250?random=4',
      category: 'Education',
      route: '/best-seller'
    },
    {
      id: 5,
      title: 'تطبيق حجز الفنادق',
      description: 'تطبيق لاستعراض واختيار الغرف الفندقية ومتابعة الحجوزات.',
      image: 'https://picsum.photos/400/250?random=5',
      category: 'Booking',
      route: '/cart'
    },
    {
      id: 6,
      title: 'تطبيق المحفظة المالية',
      description: 'نظام متابعة المصاريف الشخصية والدخل والميزانيات الشهري.',
      image: 'https://picsum.photos/400/250?random=6',
      category: 'Finance',
      route: '/register'
    },
    {
      id: 7,
      title: 'تطبيق توصيل الطلبات',
      description: 'تطبيق ربط العملاء بالمطاعم مع تتبع الطلب على الخريطة.',
      image: 'https://picsum.photos/400/250?random=7',
      category: 'Logistics',
      route: '/login'
    },
    {
      id: 8,
      title: 'لوحة تحكم تحليلات البيانات',
      description: 'داشبورد تفاعلي لعرض الرسوم البيانية وتقارير المبيعات.',
      image: 'https://picsum.photos/400/250?random=8',
      category: 'Analytics',
      route: '/my-orders'
    },
    {
      id: 9,
      title: 'شبكة تواصل اجتماعي',
      description: 'منصة للتواصل ومشاركة المنشورات مع نظام المحادثات الفورية.',
      image: 'https://picsum.photos/400/250?random=9',
      category: 'Social Media',
      route: '/projects/social'
    },
    {
      id: 10,
      title: 'نظام إدارة العقارات',
      description: 'تطبيق لعرض وشراء واستئجار العقارات والوحدات السكنية.',
      image: 'https://picsum.photos/400/250?random=10',
      category: 'Real Estate',
      route: '/projects/real-estate'
    }
  ];
}