
(() => {
    let render = new THREE.WebGLRenderer()
    render.setSize(window.innerWidth, window.innerHeight)
    render.setClearColor(0x000000, 1.0)
    render.shadowMap.enabled = true
    document.body.appendChild(render.domElement)

    let stats = new Stats()
    stats.setMode(0)
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.left = '5px'
    stats.domElement.style.top = '5px'
    document.body.appendChild(stats.domElement)

    // panel
    let settings = {
        'Camera X': 0,
        'Camera Y': 0,
        'Camera Z': 100
    }
    let panel = new dat.GUI({width: 200})
    panel.add(settings, 'Camera X', 0, 200)
    panel.add(settings, 'Camera Y', 0, 200)
    panel.add(settings, 'Camera Z', 100, 200)

    // scene
    let scene = new THREE.Scene()
    // scene.background = new THREE.Color(0x000000)
    // scene.add(new THREE.AmbientLight(0x404040))

    // window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        render.setSize(window.innerWidth, window.innerHeight)
    }, false)

    // sphere
    let sphereGeometry = new THREE.SphereGeometry(1.5, 20, 20)
    let matProps = {
        specular: '#09fcff',
        color: '#00abb1',
        emissive: '#006063',
        shininess: 10
    }
    let sphereMaterial = new THREE.MeshPhongMaterial(matProps)
    let sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphereMesh.castShadow = true
    sphereMesh.position.y = 0.75 * Math.PI / 2
    sphereMesh.name = 'sphere'
    scene.add(sphereMesh)

    // floor
    let floorGeometry = new THREE.PlaneGeometry(100, 100, 20, 20)
    let floorMaterial = new THREE.MeshPhongMaterial()
    floorMaterial.map = new THREE.TextureLoader().load('../assets/textures/floor.png')
    let repeat = THREE.RepeatWrapping
    floorMaterial.map.wrapS = repeat
    floorMaterial.map.wrapT = repeat
    floorMaterial.map.repeat.set(8, 8)
    let floorMesh = new THREE.Mesh(floorGeometry, floorMaterial)
    floorMesh.receiveShadow = true
    floorMesh.rotation.x = -0.5 * Math.PI
    scene.add(floorMesh)

    // cube
    let cubeGeometry = new THREE.BoxGeometry(2.5, 4.5, 20)
    let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xFF0000})
    let cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cubeMesh.castShadow = true
    cubeMesh.receiveShadow = true
    cubeMesh.position.z = -5
    scene.add(cubeMesh)

    // light
    let spotLight = new THREE.SpotLight()
    spotLight.position.set(0, 80, 30)
    spotLight.castShadow = true
    scene.add(spotLight)

    // camera
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(15, 6, 15)
    // camera.lookAt(new THREE.Vector3(0, 0, 100 * 4))

    // controls
    // let controls = new THREE.OrbitControls(camera, render.domElement)
    // controls.target.set(0, 0, 0)
    // controls.update()

    render.render(scene, camera)

    let step = 0
    let animate = () => {
        let sphere = scene.getObjectByName('sphere')
        render.render(scene, camera)
        camera.lookAt(sphere.position)

        step += 0.02
        sphere.position.x = 0 + (10 * (Math.cos(step)))
        sphere.position.y = 0.75 * Math.PI / 2 + (6 * Math.abs(Math.sin(step)))

        requestAnimationFrame(animate)
        stats.update()
    }
    animate()
})()
