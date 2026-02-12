$baseUrl = "https://loremflickr.com"

# Hero - Puri Sea Beach (Vastness)
# Using 1920x1080 for hero
Invoke-WebRequest -Uri "$baseUrl/1920/1080/puri,sea,beach/all" -OutFile "src/assets/hero-puri-beach-vast.jpg"

# Health - Hand pump / Sanitation (Relatable)
Invoke-WebRequest -Uri "$baseUrl/800/600/india,handpump,water/all" -OutFile "src/assets/program-health-relatable.jpg"

# Agriculture - Farmer in Paddy Field (Fit viewport)
# Using landscape aspect ratio
Invoke-WebRequest -Uri "$baseUrl/800/600/indian,farmer,paddy,field/all" -OutFile "src/assets/program-agriculture-fit.jpg"

# Microfinance - Women SHG
Invoke-WebRequest -Uri "$baseUrl/800/600/indian,women,group,sari/all" -OutFile "src/assets/program-microfinance-shg.jpg"

# Disaster - Cyclone Relief (No dance)
Invoke-WebRequest -Uri "$baseUrl/800/600/flood,relief,india/all" -OutFile "src/assets/program-disaster-relief.jpg"

Write-Host "Phase 2 Images downloaded successfully."
