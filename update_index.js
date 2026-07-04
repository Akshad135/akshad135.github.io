const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Add css
content = content.replace(
  '<link rel="stylesheet" href="css/style.css?v=4.1" />',
  '<link rel="stylesheet" href="css/style.css?v=4.1" />\n    <link rel="stylesheet" href="css/homelab.css" />'
);

// 2. Change text-left to text-center
content = content.replace(
  '<p class="text-gray-400 leading-relaxed text-left">',
  '<p class="text-gray-400 leading-relaxed text-center">'
);

// 3. Inject Server Blade drawer
const blade = `
          <!-- SERVER BLADE HOMELAB WIDGET -->
          <div class="mt-12 w-full max-w-3xl mx-auto reveal-text relative z-20">
            <div id="server-blade" class="group relative bg-[#0a0a0c] border border-gray-800 rounded-lg shadow-2xl overflow-hidden transition-all duration-500 hover:border-gray-700 cursor-pointer">
              <!-- Blade Front Panel -->
              <div class="h-14 px-4 sm:px-6 flex items-center justify-between bg-[#111318] border-b border-gray-800/50 z-20 relative">
                <div class="flex items-center gap-3 sm:gap-4">
                   <div class="w-1.5 h-6 bg-gray-800 rounded-sm"></div>
                   <div class="flex items-center gap-2 sm:gap-3">
                     <div class="relative flex h-2 w-2">
                       <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                       <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                     </div>
                     <span class="text-[9px] sm:text-[10px] md:text-xs font-mono text-gray-400 tracking-widest uppercase">Oracle ARM <span class="text-gray-600 mx-1 sm:mx-2">|</span> Homelab</span>
                   </div>
                </div>
                <div class="flex items-center gap-3 sm:gap-4">
                  <a href="https://github.com/akshad135/homelab" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-white transition-colors duration-300 z-30" title="View Homelab Repository" onclick="event.stopPropagation()">
                    <i class="fab fa-github text-sm"></i>
                  </a>
                   <div class="hidden sm:flex gap-1">
                     <div class="w-1 h-3 bg-black rounded-full"></div>
                     <div class="w-1 h-3 bg-black rounded-full"></div>
                     <div class="w-1 h-3 bg-black rounded-full"></div>
                     <div class="w-1 h-3 bg-black rounded-full"></div>
                   </div>
                   <i class="fas fa-chevron-down text-gray-600 text-xs sm:text-sm transition-transform duration-300 group-hover:text-gray-300" id="blade-chevron"></i>
                   <div class="w-1.5 h-6 bg-gray-800 rounded-sm"></div>
                </div>
              </div>
              
              <!-- Blade Drawer Content -->
              <div id="blade-drawer" class="blade-drawer bg-[#0a0a0c]">
                 <div class="p-6 sm:p-8">
                    <!-- Diagram Container -->
                    <div class="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 font-mono text-[10px] sm:text-xs text-gray-400 max-w-4xl mx-auto w-full overflow-x-auto pb-4">
                        <!-- Internet -->
                        <div class="flex flex-col items-center gap-2 z-10 min-w-[60px]">
                            <div class="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center">
                                <i class="fas fa-globe text-gray-500 text-base"></i>
                            </div>
                            <span>Internet</span>
                        </div>
                        
                        <!-- Connection Line -->
                        <div class="hidden md:block flex-1 h-px bg-gray-800 relative min-w-[20px]">
                            <div class="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse-flow"></div>
                        </div>

                        <!-- Tailscale -->
                        <div class="flex flex-col items-center gap-2 z-10 min-w-[70px]">
                            <div class="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center">
                                <i class="fas fa-network-wired text-gray-400 text-base"></i>
                            </div>
                            <span>Tailscale</span>
                        </div>

                        <!-- Connection Line -->
                        <div class="hidden md:block flex-1 h-px bg-gray-800 relative min-w-[20px]">
                            <div class="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse-flow" style="animation-delay: 0.5s"></div>
                        </div>

                        <!-- Caddy -->
                        <div class="flex flex-col items-center gap-2 z-10 min-w-[60px]">
                            <div class="w-12 h-12 rounded-lg bg-blue-900/20 border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.15)] relative">
                                <i class="fas fa-shield-alt text-blue-400 text-lg"></i>
                                <div class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                            <span class="text-blue-400">Caddy</span>
                        </div>

                        <!-- Branching Lines (Desktop) -->
                        <div class="hidden md:block w-4 h-[180px] border-t border-b border-l border-gray-800 rounded-l-lg relative right-[-1px]"></div>
                        
                        <!-- Connection Line (Mobile) -->
                        <div class="md:hidden w-px h-6 bg-gray-800 relative"></div>

                        <!-- Services Stack -->
                        <div class="flex flex-col gap-2 z-10 min-w-[180px]">
                            <div class="flex items-center justify-between gap-3 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-md hover:border-gray-600 transition-colors cursor-default">
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-chart-pie text-purple-400 w-4 text-center"></i>
                                    <span class="text-gray-300">Glance</span>
                                </div>
                                <span class="text-gray-600">80</span>
                            </div>
                            <div class="flex items-center justify-between gap-3 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-md hover:border-gray-600 transition-colors cursor-default">
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-shield-alt text-red-400 w-4 text-center"></i>
                                    <span class="text-gray-300">AdGuard</span>
                                </div>
                                <span class="text-gray-600">8001</span>
                            </div>
                            <div class="flex items-center justify-between gap-3 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-md hover:border-gray-600 transition-colors cursor-default">
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-key text-yellow-400 w-4 text-center"></i>
                                    <span class="text-gray-300">Vaultwarden</span>
                                </div>
                                <span class="text-gray-600">8002</span>
                            </div>
                            <div class="flex items-center justify-between gap-3 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-md hover:border-gray-600 transition-colors cursor-default">
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-bookmark text-blue-400 w-4 text-center"></i>
                                    <span class="text-gray-300">Bookmarks</span>
                                </div>
                                <span class="text-gray-600">8003</span>
                            </div>
                            <div class="flex items-center justify-between gap-3 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-md hover:border-gray-600 transition-colors cursor-default">
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-fire text-orange-400 w-4 text-center"></i>
                                    <span class="text-gray-300">Ignis</span>
                                </div>
                                <span class="text-gray-600">8004</span>
                            </div>
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>`;

content = content.replace(
  /<!-- Nodes will be injected here by JS -->\s*<\/div>/,
  `<!-- Nodes will be injected here by JS -->\n          </div>\n${blade}`
);

// 4. Inject js/homelab.js script
content = content.replace(
  '<script src="js/script.js"></script>',
  '<script src="js/script.js"></script>\n    <script src="js/homelab.js"></script>'
);

fs.writeFileSync('index.html', content);
console.log('Update complete');
