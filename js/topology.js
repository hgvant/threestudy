(() => {
    // Scene
    let scene = new THREE.Scene()
    scene.background = new THREE.Color(0, 0, 0)
    scene.add(new THREE.AmbientLight(0xffffff))

    // Camera
    let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2048)
    camera.position.set(1300, 300, 400)

    // Controls
    let controls = new THREE.OrbitControls(camera)
    controls.rotateSpeed = 1
    controls.zoomSpeed = 1.2
    controls.panSpeed = 0.8
    controls.enableZoom = false
    controls.enablePan = false
    controls.autoRotate = false
    controls.autoRotateSpeed  = 0.5

    // Plane
    let plane = new THREE.Group()
    for (let i = 0; i < 3; i++) {
        let y = 300 - 300 * i
        let grid = new THREE.GridHelper(5120, 128)
        grid.position.y = y
        grid.material.opacity = 0.75
        grid.material.transparent = true
        if (i === 0) {
            grid.material.color = new THREE.Color(0xf08652)
        } else if (i === 1) {
            grid.material.color = new THREE.Color(0x1e82e6)
        } else if (i === 2) {
            grid.material.color = new THREE.Color(0x7ae174)
        }
        plane.add(grid)
    }
    plane.name = 'planeGroup'
    scene.add(plane)

    let renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    let animate = () => {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }
    animate()

})()