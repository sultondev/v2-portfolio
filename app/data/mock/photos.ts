import type { Photo } from '~/types/photo'
import { PhotoGroup } from '~/enums/photo'

export const MOCK_PHOTOS: Photo[] = [
  { id: 'ph-01', title: 'Morning light, Chorsu', place: 'Chorsu Bazaar', city: 'Tashkent', group: PhotoGroup.Tashkent, date: '2026·03', camera: 'Fujifilm X100V', lens: '23mm f/2', exif: 'f/4 · 1/500 · ISO 160', ratio: '4/5' },
  { id: 'ph-02', title: 'Registan after rain', place: 'Registan Square', city: 'Samarkand', group: PhotoGroup.SilkRoad, date: '2025·10', camera: 'Fujifilm X100V', lens: '23mm f/2', exif: 'f/5.6 · 1/250 · ISO 200', ratio: '3/2' },
  { id: 'ph-03', title: 'Desk, 2am build', place: 'Home studio', city: 'Berlin', group: PhotoGroup.Desk, date: '2026·01', camera: 'iPhone 15 Pro', lens: '24mm', exif: 'f/1.8 · 1/60 · ISO 640', ratio: '1/1' },
  { id: 'ph-04', title: 'Tiles of Shah-i-Zinda', place: 'Shah-i-Zinda', city: 'Samarkand', group: PhotoGroup.SilkRoad, date: '2025·10', camera: 'Fujifilm X100V', lens: '23mm f/2', exif: 'f/2.8 · 1/320 · ISO 160', ratio: '2/3' },
  { id: 'ph-05', title: 'Chimgan, first snow', place: 'Chimgan peaks', city: 'Tashkent region', group: PhotoGroup.Mountains, date: '2025·12', camera: 'Fujifilm X100V', lens: '23mm f/2', exif: 'f/8 · 1/1000 · ISO 160', ratio: '3/2' },
  { id: 'ph-06', title: 'U-Bahn, Kottbusser Tor', place: 'Kottbusser Tor', city: 'Berlin', group: PhotoGroup.Berlin, date: '2026·02', camera: 'Fujifilm X100V', lens: '23mm f/2', exif: 'f/2 · 1/125 · ISO 1600', ratio: '4/5' },
  { id: 'ph-07', title: 'Minor Mosque at dusk', place: 'Minor Mosque', city: 'Tashkent', group: PhotoGroup.Tashkent, date: '2025·09', camera: 'Fujifilm X100V', lens: '23mm f/2', exif: 'f/2.8 · 1/60 · ISO 800', ratio: '2/3' },
  { id: 'ph-08', title: 'Kalta Minor, noon', place: 'Itchan Kala', city: 'Khiva', group: PhotoGroup.SilkRoad, date: '2024·05', camera: 'Sony A7 III', lens: '35mm f/1.8', exif: 'f/9 · 1/800 · ISO 100', ratio: '4/5' },
  { id: 'ph-09', title: 'Keyboard, new switches', place: 'Home studio', city: 'Berlin', group: PhotoGroup.Desk, date: '2025·11', camera: 'Fujifilm X100V', lens: '23mm f/2', exif: 'f/2 · 1/100 · ISO 400', ratio: '3/2' },
  { id: 'ph-10', title: 'Spree in February', place: 'Oberbaum Bridge', city: 'Berlin', group: PhotoGroup.Berlin, date: '2026·02', camera: 'Fujifilm X100V', lens: '23mm f/2', exif: 'f/5.6 · 1/400 · ISO 160', ratio: '16/9' },
  { id: 'ph-11', title: 'Lyabi-Hauz evening', place: 'Lyabi-Hauz', city: 'Bukhara', group: PhotoGroup.SilkRoad, date: '2024·05', camera: 'Sony A7 III', lens: '35mm f/1.8', exif: 'f/2 · 1/80 · ISO 1250', ratio: '1/1' },
  { id: 'ph-12', title: 'Metro, Kosmonavtlar', place: 'Kosmonavtlar station', city: 'Tashkent', group: PhotoGroup.Tashkent, date: '2026·03', camera: 'Fujifilm X100V', lens: '23mm f/2', exif: 'f/2 · 1/60 · ISO 2000', ratio: '2/3' },
  { id: 'ph-13', title: 'Charvak, still water', place: 'Charvak Reservoir', city: 'Tashkent region', group: PhotoGroup.Mountains, date: '2025·07', camera: 'Fujifilm X100V', lens: '23mm f/2', exif: 'f/8 · 1/640 · ISO 160', ratio: '3/2' },
  { id: 'ph-14', title: 'Conference badge pile', place: 'Vue.js Nation', city: 'Amsterdam', group: PhotoGroup.Desk, date: '2025·06', camera: 'iPhone 15 Pro', lens: '24mm', exif: 'f/1.8 · 1/120 · ISO 250', ratio: '4/5' },
]
