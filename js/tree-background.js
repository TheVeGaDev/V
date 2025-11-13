// تهيئة Three.js لخلفية مذهلة
function initThreeJS() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x050510, 1);
    document.getElementById('three-container').appendChild(renderer.domElement);
    
    // إنشاء جسيمات متطورة (تم تقليل العدد لتحسين الأداء)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 8000; // تم تقليل عدد الجسيمات
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
        colorArray[i] = Math.random();
        velocityArray[i] = (Math.random() - 0.5) * 0.02;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocityArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // إضافة ضباب كوني
    scene.fog = new THREE.FogExp2(0x050510, 0.001);
    
    // إضاءة متقدمة
    const ambientLight = new THREE.AmbientLight(0x00a2ff, 0.1);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x00ff9d, 0.5);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xb300ff, 0.3);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);
    
    camera.position.z = 5;
    
    // تحريك الجسيمات بشكل متطور
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.001;
        
        const positions = particlesMesh.geometry.attributes.position.array;
        const velocities = particlesMesh.geometry.attributes.velocity.array;
        
        for(let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];
            
            // إعادة تدوير الجسيمات
            if(Math.abs(positions[i]) > 50) positions[i] = -positions[i] * 0.5;
            if(Math.abs(positions[i + 1]) > 50) positions[i + 1] = -positions[i + 1] * 0.5;
            if(Math.abs(positions[i + 2]) > 50) positions[i + 2] = -positions[i + 2] * 0.5;
        }
        
        particlesMesh.geometry.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // تكيف مع تغيير حجم النافذة
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}