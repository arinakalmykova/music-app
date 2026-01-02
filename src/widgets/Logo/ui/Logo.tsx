export default function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="url(#gradient)" />
      <path 
        d="M16 8C14.8954 8 14 8.89543 14 10V22C14 23.1046 14.8954 24 16 24C17.1046 24 18 23.1046 18 22V10C18 8.89543 17.1046 8 16 8Z" 
        fill="white"
      />
      <path 
        d="M11 12C9.89543 12 9 12.8954 9 14V22C9 23.1046 9.89543 24 11 24C12.1046 24 13 23.1046 13 22V14C13 12.8954 12.1046 12 11 12Z" 
        fill="white"
        fillOpacity="0.8"
      />
      <path 
        d="M21 14C19.8954 14 19 14.8954 19 16V22C19 23.1046 19.8954 24 21 24C22.1046 24 23 23.1046 23 22V16C23 14.8954 22.1046 14 21 14Z" 
        fill="white"
        fillOpacity="0.6"
      />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7"/>
          <stop offset="1" stopColor="#EC4899"/>
        </linearGradient>
      </defs>
    </svg>
  );
}