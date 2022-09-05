/// <reference types="react-scripts" />
// declare module 'react/jsx-runtime' {
//   export default any;
// }

declare module '*.scss' {
  const classNames: Record<string, string>;
  export default classNames;
}

