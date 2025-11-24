function updateClock() {
            const now = new Date();
            
            // Format time
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            
            // Format date
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            };
            const dateString = now.toLocaleDateString('en-US', options);
            
            // Format day
            const dayString = now.toLocaleDateString('en-US', { weekday: 'long' });
            
            // Update DOM
            document.getElementById('time').textContent = `${hours}:${minutes}`;
            document.getElementById('seconds').textContent = seconds;
            document.getElementById('date').textContent = dateString;
            document.getElementById('day').textContent = dayString;
        }

        function detectTheme() {
            // Check if we're in an iframe (likely embedded in Notion)
            if (window.parent !== window) {
                try {
                    // Try to detect Notion's theme from parent window
                    const parentDoc = window.parent.document;
                    const notionRoot = parentDoc.querySelector('[data-theme]') || parentDoc.documentElement;
                    
                    if (notionRoot) {
                        const theme = notionRoot.getAttribute('data-theme') || 
                                     notionRoot.getAttribute('class') || 
                                     getComputedStyle(notionRoot).getPropertyValue('color-scheme');
                        
                        if (theme && theme.includes('dark')) {
                            document.body.className = 'notion-dark-theme';
                        } else {
                            document.body.className = 'notion-light-theme';
                        }
                    }
                } catch (e) {
                    // If we can't access parent, fall back to system preference
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                        document.body.className = 'notion-dark-theme';
                    } else {
                        document.body.className = 'notion-light-theme';
                    }
                }
            } else {
                // Not in iframe, use system preference
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.body.className = 'notion-dark-theme';
                } else {
                    document.body.className = 'notion-light-theme';
                }
            }
        }

        // Initialize
        updateClock();
        detectTheme();
        
        // Update clock every second
        setInterval(updateClock, 1000);
        
        // Listen for theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectTheme);
        }
        
        // Check for theme changes periodically (for Notion theme switching)
        setInterval(detectTheme, 1000);