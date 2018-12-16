
(() => {
    let render = new THREE.WebGLRenderer()
    render.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(render.domElement)

    let stats = new Stats()
    stats.setMode(0)
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.left = '5px'
    stats.domElement.style.top = '5px'
    document.body.appendChild(stats.domElement)

    let settings = {
        'Camera X': 0,
        'Camera Y': 0,
        'Camera Z': 100
    }
    let panel = new dat.GUI({width: 200})
    panel.add(settings, 'Camera X', 0, 200)
    panel.add(settings, 'Camera Y', 0, 200)
    panel.add(settings, 'Camera Z', 100, 200)

    let scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    scene.add(new THREE.AmbientLight(0x404040))

    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
    camera.position.set(100, 100, 104 * 4)
    camera.lookAt(new THREE.Vector3(0, 0, 100 * 4))

    let controls = new THREE.OrbitControls(camera, render.domElement)
    controls.target.set(0, 0, 0)
    controls.update()

    // window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        render.setSize(window.innerWidth, window.innerHeight)
    }, false)

    let materialX = new THREE.LineBasicMaterial({color: 0xFF0000})
    let geometryX = new THREE.Geometry()
    geometryX.setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(10, 0, 0)
    ])
    let lineX = new THREE.Line(geometryX, materialX)
    scene.add(lineX)

    let materialY = new THREE.LineBasicMaterial({color: 0x00FF00})
    let geometryY = new THREE.Geometry()
    geometryY.setFromPoints([
        new THREE.Vector3(10, 0, 10),
        new THREE.Vector3(10, 50, 10)
    ])
    let lineY = new THREE.Line(geometryY, materialY)
    scene.add(lineY)

    let materialZ = new THREE.LineBasicMaterial({color: 0x0000FF})
    let geometryZ = new THREE.Geometry()
    geometryZ.setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 100)
    ])
    let lineZ = new THREE.Line(geometryZ, materialZ)
    scene.add(lineZ)

    render.render(scene, camera)

    let animate = () => {
        requestAnimationFrame(animate)
        // camera.position.set(settings['Camera X'], settings['Camera Y'], settings['Camera Z'])
        render.render(scene, camera)

        stats.update()
    }
    animate()
})()
