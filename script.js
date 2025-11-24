function updateClock() {
            const now = new Date();
            
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            };
            const dateString = now.toLocaleDateString('en-US', options);
            
            const dayString = now.toLocaleDateString('en-US', { weekday: 'long' });
            
            document.getElementById('time').textContent = `${hours}:${minutes}`;
            document.getElementById('seconds').textContent = seconds;
            document.getElementById('date').textContent = dateString;
            document.getElementById('day').textContent = dayString;
        }

        function detectTheme() {
            if (window.parent !== window) {
                try {
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
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                        document.body.className = 'notion-dark-theme';
                    } else {
                        document.body.className = 'notion-light-theme';
                    }
                }
            } else {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.body.className = 'notion-dark-theme';
                } else {
                    document.body.className = 'notion-light-theme';
                }
            }
        }

        updateClock();
        detectTheme();
        
        setInterval(updateClock, 1000);
        
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectTheme);
        }
        
        setInterval(detectTheme, 1000);
