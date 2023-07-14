// import { trigger, transition, style, query, animateChild, group, animate } from "@angular/animations";

// export const slideInAnimation =
//   trigger('routeAnimations', [
//     transition('HomePage <=> AboutPage', [
//       style({ position: 'relative' }),
//       query(':enter, :leave', [
//         style({
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%'
//         })
//       ]),
//       query(':enter', [
//         style({ left: '-100%' })
//       ]),
//       query(':leave', animateChild()),
//       group([
//         query(':leave', [
//           animate('300ms ease-out', style({ left: '100%' }))
//         ]),
//         query(':enter', [
//           animate('300ms ease-out', style({ left: '0%' }))
//         ]),
//       ]),
//     ]),
//     transition('* <=> *', [
//       style({ position: 'relative' }),
//       query(':enter, :leave', [
//         style({
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%'
//         })
//       ]),
//       query(':enter', [
//         style({ left: '-100%' })
//       ]),
//       query(':leave', animateChild()),
//       group([
//         query(':leave', [
//           animate('200ms ease-out', style({ left: '100%', opacity: 0 }))
//         ]),
//         query(':enter', [
//           animate('300ms ease-out', style({ left: '0%' }))
//         ]),
//         query('@*', animateChild())
//       ]),
//     ])
//   ]);


// export const routeAnimation = trigger('routeAnimation', [
//     transition('* <=> *', [
//       query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
//       query(':enter', style({ transform: 'translateX(100%)' }), { optional: true }),
//       query(':leave', animate('500ms ease-out', style({ transform: 'translateX(-100%)' })), { optional: true }),
//       query(':enter', animate('500ms ease-out', style({ transform: 'translateX(0%)' })), { optional: true }),
//     ]),
//   ]);  