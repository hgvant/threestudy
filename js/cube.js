
(() => {
    let scene = new THREE.Scene()
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    let render = new THREE.WebGLRenderer()
    render.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(render.domElement)

    let geometry = new THREE.BoxGeometry(1, 1, 1)
    let material = new THREE.MeshBasicMaterial({color: 0x00FF00})
    let cube = new THREE.Mesh(geometry, material)

    scene.add(cube)

    camera.position.z = 5

    let animate = () => {
        requestAnimationFrame(animate)
        cube.rotation.x += 0.1
        cube.rotation.y += 0.1
        render.render(scene, camera)
    }
    animate()
})()
