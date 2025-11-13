// تهيئة Three.js لخلفية الفضاء البرمجي
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
    
    // مجموعة النصوص البرمجية
    const codeSnippets = [
        // Python
        "def calculate_fibonacci(n):\n    if n <= 1:\n        return n\n    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)",
        
        "class NeuralNetwork:\n    def __init__(self, layers):\n        self.layers = layers\n        self.weights = []",
        
        "import numpy as np\nimport tensorflow as tf\nfrom keras.models import Sequential",
        
        "async def process_data(data):\n    results = await api_call(data)\n    return json.loads(results)",
        
        // JavaScript
        "const AI = {\n    train: function(data) {\n        return new Promise((resolve) => {\n            this.model.fit(data);\n        });\n    }\n}",
        
        "function quantumCompute() {\n    const qubits = initializeQubits();\n    return applyGate(qubits, HADAMARD);\n}",
        
        // Java
        "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello AI World!\");\n    }\n}",
        
        // C++
        "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"AI Revolution\" << endl;\n    return 0;\n}"
    ];

    // إنشاء مجموعة النصوص البرمجية العائمة
    const codeTexts = [];
    const codeGroup = new THREE.Group();
    scene.add(codeGroup);

    // إنشاء نصوص برمجية عائمة
    function createCodeText(text, position) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 256;
        
        // خلفية شبه شفافة للنص
        context.fillStyle = 'rgba(5, 5, 16, 0.3)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // النص البرمجي
        context.font = '14px "Courier New", monospace';
        context.fillStyle = '#00ff9d';
        context.textAlign = 'left';
        
        const lines = text.split('\n');
        lines.forEach((line, index) => {
            context.fillText(line, 10, 30 + index * 20);
        });

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ 
            map: texture,
            transparent: true,
            opacity: 0.7
        });

        const sprite = new THREE.Sprite(material);
        sprite.position.copy(position);
        sprite.scale.set(8, 4, 1);
        
        // إضافة حركة عشوائية
        sprite.userData = {
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            ),
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            changeTimer: Math.random() * 300 + 100
        };

        codeGroup.add(sprite);
        codeTexts.push(sprite);
    }

    // إنشاء نصوص برمجية عشوائية
    for (let i = 0; i < 15; i++) {
        const text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        const position = new THREE.Vector3(
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80
        );
        createCodeText(text, position);
    }

    // جسيمات النجوم الخلفية
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 5000;
    
    const starsPosArray = new Float32Array(starsCount * 3);
    const starsColorArray = new Float32Array(starsCount * 3);
    
    for(let i = 0; i < starsCount * 3; i++) {
        starsPosArray[i] = (Math.random() - 0.5) * 200;
        starsColorArray[i] = Math.random() * 0.5 + 0.5; // ألوان زرقاء وخضراء
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPosArray, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(starsColorArray, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);

    // خطوط اتصال بين النصوص (شبكة برمجية)
    const linesGeometry = new THREE.BufferGeometry();
    const linesPosArray = new Float32Array(codeTexts.length * 3 * 2);
    let linesIndex = 0;

    for (let i = 0; i < codeTexts.length; i++) {
        for (let j = i + 1; j < codeTexts.length; j++) {
            if (Math.random() > 0.7) { // 30% احتمال لإنشاء خط اتصال
                const pos1 = codeTexts[i].position;
                const pos2 = codeTexts[j].position;
                
                linesPosArray[linesIndex++] = pos1.x;
                linesPosArray[linesIndex++] = pos1.y;
                linesPosArray[linesIndex++] = pos1.z;
                
                linesPosArray[linesIndex++] = pos2.x;
                linesPosArray[linesIndex++] = pos2.y;
                linesPosArray[linesIndex++] = pos2.z;
            }
        }
    }

    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linesPosArray, 3));
    const linesMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00a2ff,
        transparent: true,
        opacity: 0.3
    });
    
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // إضاءة متقدمة
    const ambientLight = new THREE.AmbientLight(0x00a2ff, 0.1);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00ff9d, 0.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    camera.position.z = 15;

    // تحريك المشهد
    function animate() {
        requestAnimationFrame(animate);
        
        // تدوير النجوم
        starsMesh.rotation.x += 0.0001;
        starsMesh.rotation.y += 0.0002;
        
        // تحريك النصوص البرمجية
        codeTexts.forEach((text, index) => {
            // الحركة
            text.position.add(text.userData.velocity);
            
            // التدوير
            text.rotation.z += text.userData.rotationSpeed;
            
            // التأكد من بقاء النصوص ضمن الحدود
            if (Math.abs(text.position.x) > 45) text.userData.velocity.x *= -1;
            if (Math.abs(text.position.y) > 45) text.userData.velocity.y *= -1;
            if (Math.abs(text.position.z) > 45) text.userData.velocity.z *= -1;
            
            // تغيير النص البرمجي بشكل دوري
            text.userData.changeTimer--;
            if (text.userData.changeTimer <= 0) {
                const newText = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                
                // إنشاء نسيج جديد
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = 512;
                canvas.height = 256;
                
                context.fillStyle = 'rgba(5, 5, 16, 0.3)';
                context.fillRect(0, 0, canvas.width, canvas.height);
                
                context.font = '14px "Courier New", monospace';
                context.fillStyle = Math.random() > 0.5 ? '#00ff9d' : '#00a2ff';
                context.textAlign = 'left';
                
                const lines = newText.split('\n');
                lines.forEach((line, lineIndex) => {
                    context.fillText(line, 10, 30 + lineIndex * 20);
                });

                const newTexture = new THREE.CanvasTexture(canvas);
                text.material.map = newTexture;
                text.material.needsUpdate = true;
                
                text.userData.changeTimer = Math.random() * 400 + 200;
            }
        });

        // تحريك الكاميرا بشكل طفيف
        camera.position.x = Math.sin(Date.now() * 0.0001) * 2;
        camera.position.y = Math.cos(Date.now() * 0.0001) * 2;
        camera.lookAt(0, 0, 0);

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