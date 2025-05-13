
const CesiumFun = () => {
  const token = 'bf43eb5a494cd8f08a9f281372a96439'
  const Cesium = window.Cesium
  let echarts = window.echarts
  let viewer = ''
  const initCesium = (domId) => {
    viewer = new Cesium.Viewer(domId, {
      shouldAnimate: false,
      selectionIndicator: true,
      animation: false, //是否创建动画小器件，左下角仪表
      timeline: false, //是否显示时间线控件
      fullscreenButton: false, //右下角全屏按
      baseLayerPicker: false, //是否显示右上角图层选择控件
      geocoder: false, //是否显示地名查找控件
      infoBox: false,
      homeButton: false, //home
      navigationHelpButton: false, //是否显示帮助信息控件
      imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
      })
    })
    // 抗锯齿 似乎没用
    // viewer.scene.fxaa = true
    console.log(viewer)
    // 设置最大缩放级别
    // viewer.scene.screenSpaceCameraController.maximumZoomDistance = 10000000

    // // 设置最小缩放级别
    // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1000000
    // //去除版权
    viewer._cesiumWidget._creditContainer.style.display = 'none'

    //去cesium logo水印
    viewer.cesiumWidget.creditContainer.style.display = 'none'

    var subdomains = ['0', '1', '2', '3', '4', '5', '6', '7']

    // 叠加三维地名服务
    var wtfs = new Cesium.GeoWTFS({
      viewer,
      subdomains: subdomains,
      metadata: {
        boundBox: {
          minX: -180,
          minY: -90,
          maxX: 180,
          maxY: 90
        },
        minLevel: 1,
        maxLevel: 20
      },
      aotuCollide: true, //是否开启避让
      collisionPadding: [5, 10, 8, 5], //开启避让时，标注碰撞增加内边距，上、右、下、左
      serverFirstStyle: true, //服务端样式优先
      labelGraphics: {
        font: '28px sans-serif',
        fontSize: 28,
        fillColor: Cesium.Color.WHITE,
        scale: 0.5,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 5,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        showBackground: false,
        backgroundColor: Cesium.Color.RED,
        backgroundPadding: new Cesium.Cartesian2(10, 10),
        horizontalOrigin: Cesium.HorizontalOrigin.MIDDLE,
        verticalOrigin: Cesium.VerticalOrigin.TOP,
        eyeOffset: Cesium.Cartesian3.ZERO,
        pixelOffset: new Cesium.Cartesian2(0, 8)
      },
      billboardGraphics: {
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        eyeOffset: Cesium.Cartesian3.ZERO,
        pixelOffset: Cesium.Cartesian2.ZERO,
        alignedAxis: Cesium.Cartesian3.ZERO,
        color: Cesium.Color.WHITE,
        rotation: 0,
        scale: 1,
        width: 18,
        height: 18
      }
    })
    var tdtUrl = 'https://t{s}.tianditu.gov.cn/'

    //三维地名服务，使用wtfs服务
    wtfs.getTileUrl = function () {
      return (
        tdtUrl +
        'mapservice/GetTiles?lxys={z},{x},{y}&tk=' +
        'a125dd9aef36e4cf381a34add119bb01'
      )
    }
    wtfs.initTDT([
      {
        x: 6,
        y: 1,
        level: 2,
        boundBox: {
          minX: 90,
          minY: 0,
          maxX: 135,
          maxY: 45
        }
      },
      {
        x: 7,
        y: 1,
        level: 2,
        boundBox: {
          minX: 135,
          minY: 0,
          maxX: 180,
          maxY: 45
        }
      },
      {
        x: 6,
        y: 0,
        level: 2,
        boundBox: {
          minX: 90,
          minY: 45,
          maxX: 135,
          maxY: 90
        }
      },
      {
        x: 7,
        y: 0,
        level: 2,
        boundBox: {
          minX: 135,
          minY: 45,
          maxX: 180,
          maxY: 90
        }
      },
      {
        x: 5,
        y: 1,
        level: 2,
        boundBox: {
          minX: 45,
          minY: 0,
          maxX: 90,
          maxY: 45
        }
      },
      {
        x: 4,
        y: 1,
        level: 2,
        boundBox: {
          minX: 0,
          minY: 0,
          maxX: 45,
          maxY: 45
        }
      },
      {
        x: 5,
        y: 0,
        level: 2,
        boundBox: {
          minX: 45,
          minY: 45,
          maxX: 90,
          maxY: 90
        }
      },
      {
        x: 4,
        y: 0,
        level: 2,
        boundBox: {
          minX: 0,
          minY: 45,
          maxX: 45,
          maxY: 90
        }
      },
      {
        x: 6,
        y: 2,
        level: 2,
        boundBox: {
          minX: 90,
          minY: -45,
          maxX: 135,
          maxY: 0
        }
      },
      {
        x: 6,
        y: 3,
        level: 2,
        boundBox: {
          minX: 90,
          minY: -90,
          maxX: 135,
          maxY: -45
        }
      },
      {
        x: 7,
        y: 2,
        level: 2,
        boundBox: {
          minX: 135,
          minY: -45,
          maxX: 180,
          maxY: 0
        }
      },
      {
        x: 5,
        y: 2,
        level: 2,
        boundBox: {
          minX: 45,
          minY: -45,
          maxX: 90,
          maxY: 0
        }
      },
      {
        x: 4,
        y: 2,
        level: 2,
        boundBox: {
          minX: 0,
          minY: -45,
          maxX: 45,
          maxY: 0
        }
      },
      {
        x: 3,
        y: 1,
        level: 2,
        boundBox: {
          minX: -45,
          minY: 0,
          maxX: 0,
          maxY: 45
        }
      },
      {
        x: 3,
        y: 0,
        level: 2,
        boundBox: {
          minX: -45,
          minY: 45,
          maxX: 0,
          maxY: 90
        }
      },
      {
        x: 2,
        y: 0,
        level: 2,
        boundBox: {
          minX: -90,
          minY: 45,
          maxX: -45,
          maxY: 90
        }
      },
      {
        x: 0,
        y: 1,
        level: 2,
        boundBox: {
          minX: -180,
          minY: 0,
          maxX: -135,
          maxY: 45
        }
      },
      {
        x: 1,
        y: 0,
        level: 2,
        boundBox: {
          minX: -135,
          minY: 45,
          maxX: -90,
          maxY: 90
        }
      },
      {
        x: 0,
        y: 0,
        level: 2,
        boundBox: {
          minX: -180,
          minY: 45,
          maxX: -135,
          maxY: 90
        }
      }
    ])

    // 叠加影像服务
    var imgMap = new Cesium.UrlTemplateImageryProvider({
      url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + token,
      subdomains: subdomains,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      maximumLevel: 18
    });
    viewer.imageryLayers.addImageryProvider(imgMap);

    // 叠加国界服务
    var iboMap = new Cesium.UrlTemplateImageryProvider({
      url: tdtUrl + 'DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=' + token,
      subdomains: subdomains,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      maximumLevel: 10
    })
    viewer.imageryLayers.addImageryProvider(iboMap)

    // Fly the camera to the given longitude, latitude, and height.将三维球定位到中国
    viewer.camera.flyTo({
      // height 值越小，球越大；说明这个height是camera视角离地面的高度,值越大，离地面越高，地图越小越不清晰
      destination: Cesium.Cartesian3.fromDegrees(107.2789, 36.019386, 12000000)
    })
    // viewer.camera.lookAt(
    //   Cesium.Cartesian3.fromDegrees(107.2789, 36.019386),
    //   new Cesium.Cartesian3(0.0, -4790000.0, 3930000.0)
    // )
    // viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    return viewer
  }

  // 连线关键方法
  const cesiumUseEcharts = (option) => {
    // 结合echarts 为echarts注册些东西:
    // eslint-disable-next-line prettier/prettier
    ; (function (e) {
      const t = {}
      function n(r) {
        if (t[r]) return t[r].exports
        const i = (t[r] = {
          i: r,
          l: !1,
          exports: {}
        })
        return e[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports
      }
      // eslint-disable-next-line prettier/prettier
      ; (n.m = e),
        (n.c = t),
        (n.d = function (e, t, r) {
          n.o(e, t) ||
            Object.defineProperty(e, t, {
              enumerable: !0,
              get: r
            })
        }),
        (n.r = function (e) {
          'undefined' != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, {
              value: 'Module'
            }),
            Object.defineProperty(e, '__esModule', {
              value: !0
            })
        }),
        (n.t = function (e, t) {
          if ((1 & t && (e = n(e)), 8 & t)) return e
          if (4 & t && 'object' == typeof e && e && e.__esModule) return e
          const r = Object.create(null)
          if (
            (n.r(r),
              Object.defineProperty(r, 'default', {
                enumerable: !0,
                value: e
              }),
              2 & t && 'string' != typeof e)
          )
            for (let i in e)
              n.d(
                r,
                i,
                function (t) {
                  return e[t]
                }.bind(null, i)
              )
          return r
        }),
        (n.n = function (e) {
          let t =
            e && e.__esModule
              ? function () {
                // eslint-disable-next-line prettier/prettier
                return e.default
              }
              : function () {
                return e
              }
          return n.d(t, 'a', t), t
        }),
        (n.o = function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t)
        }),
        (n.p = ''),
        n((n.s = 0))
    })([
      function (e, t, n) {
        e.exports = n(1)
      },
      function (e, t, n) {
        echarts ? n(2).load() : console.error('missing echarts lib')
      },
      function (e, t, n) {
        'use strict'
        function r(e, t) {
          for (let n = 0; n < t.length; n++) {
            let r = t[n]
              ; (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
          }
        }
        n.r(t)
        let i = (function () {
          function e(t, n) {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError('Cannot call a class as a function')
            })(this, e),
              (this._viewer = t),
              (this.dimensions = ['lng', 'lat']),
              (this._mapOffset = [0, 0]),
              (this._api = n)
          }
          let t, n, i
          return (
            (t = e),
            (i = [
              {
                key: 'create',
                value: function (t, n) {
                  let r
                  t.eachComponent('GLMap', function (t) {
                    ; (r = new e(echarts.cesiumViewer, n)).setMapOffset(
                      t.__mapOffset || [0, 0]
                    ),
                      (t.coordinateSystem = r)
                  }),
                    t.eachSeries(function (e) {
                      'GLMap' === e.get('coordinateSystem') &&
                        (e.coordinateSystem = r)
                    })
                }
              },
              {
                key: 'dimensions',
                get: function () {
                  return ['lng', 'lat']
                }
              }
            ]),
            (n = [
              {
                key: 'setMapOffset',
                value: function (e) {
                  return (this._mapOffset = e), this
                }
              },
              {
                key: 'getViewer',
                value: function () {
                  return this._viewer
                }
              },
              {
                key: 'dataToPoint',
                value: function (e) {
                  let t = this._viewer.scene,
                    n = [0, 0],
                    r = Cesium.Cartesian3.fromDegrees(e[0], e[1])
                  if (!r) return n
                  if (
                    t.mode === Cesium.SceneMode.SCENE3D &&
                    Cesium.Cartesian3.angleBetween(t.camera.position, r) >
                    Cesium.Math.toRadians(80)
                  )
                    return !1
                  let i = t.cartesianToCanvasCoordinates(r)
                  return i
                    ? [i.x - this._mapOffset[0], i.y - this._mapOffset[1]]
                    : n
                }
              },
              {
                key: 'pointToData',
                value: function (e) {
                  let t = this._mapOffset,
                    n = this._viewer.scene.globe.ellipsoid,
                    r = new Cesium.cartesian3(e[1] + t, e[2] + t[2], 0),
                    i = n.cartesianToCartographic(r)
                  return [i.lng, i.lat]
                }
              },
              {
                key: 'getViewRect',
                value: function () {
                  let e = this._api
                  return new echarts.graphic.BoundingRect(
                    0,
                    0,
                    e.getWidth(),
                    e.getHeight()
                  )
                }
              },
              {
                key: 'getRoamTransform',
                value: function () {
                  return echarts.matrix.create()
                }
              }
            ]) && r(t.prototype, n),
            i && r(t, i),
            e
          )
        })()

        echarts.extendComponentModel({
          type: 'GLMap',
          getViewer: function () {
            return echarts.cesiumViewer
          },
          defaultOption: {
            roam: !1
          }
        }),
          echarts.extendComponentView({
            type: 'GLMap',
            init: function (e, t) {
              ; (this.api = t),
                echarts.cesiumViewer.scene.postRender.addEventListener(
                  this.moveHandler,
                  this
                )
            },
            moveHandler: function (e, t) {
              this.api.dispatchAction({
                type: 'GLMapRoam'
              })
            },
            render: function (e, t, n) { },
            dispose: function (e) {
              echarts.cesiumViewer.scene.postRender.removeEventListener(
                this.moveHandler,
                this
              )
            }
          })
        function a() {
          echarts.registerCoordinateSystem('GLMap', i),
            echarts.registerAction(
              {
                type: 'GLMapRoam',
                event: 'GLMapRoam',
                update: 'updateLayout'
              },
              function (e, t) { }
            )
        }
        n.d(t, 'load', function () {
          return a
        })
      }
    ]);

    // 开始 调用的方法
    echarts.cesiumViewer = viewer
    function hrcEcharts(t, e) {
      this._mapContainer = t

      this._overlay = this._createChartOverlay()

      this._overlay.setOption(e)
    }

    hrcEcharts.prototype._createChartOverlay = function () {
      console.log(11111111)
      // if (
      //   document.getElementsByClassName('echartMap') &&
      //   document.getElementsByClassName('echartMap').length > 0
      // ) {
      //   document.getElementsByClassName('echartMap')[0].remove()
      // }
      const t = this._mapContainer.scene

      t.canvas.setAttribute('tabIndex', 0)
      const e = document.createElement('div')
      e.style.position = 'absolute'
      e.style.top = '0px'
      e.style.left = '0px'
      e.style.width = t.canvas.width + 'px'
      e.style.height = t.canvas.height + 'px'
      e.style.pointerEvents = 'none'
      const l = document.getElementsByClassName('echartMap').length
      e.setAttribute(
        'id',
        'ysCesium-echarts-' + parseInt(Math.random() * 99999) + '-' + l
      )
      e.setAttribute('class', 'echartMap')
      this._mapContainer.container.appendChild(e)
      this._echartsContainer = e
      return echarts.init(e)
    }

    hrcEcharts.prototype.dispose = function () {
      this._echartsContainer &&
        (this._mapContainer.container.removeChild(this._echartsContainer),
          (this._echartsContainer = null)),
        this._overlay && (this._overlay.dispose(), (this._overlay = null))
    }
    hrcEcharts.prototype.updateOverlay = function (t) {
      this._overlay && this._overlay.setOption(t)
    }
    hrcEcharts.prototype.getMap = function () {
      return this._mapContainer
    }
    hrcEcharts.prototype.getOverlay = function () {
      return this._overlay
    }
    hrcEcharts.prototype.show = function () {
      document.getElementById(this._id).style.visibility = 'visible'
    }
    hrcEcharts.prototype.hide = function () {
      document.getElementById(this._id).style.visibility = 'hidden'
    }
    return new hrcEcharts(viewer, option)
  }

  const strokeProvince = async (code) => {
    const jsonData = `/json/${code}.json`
    // const jsonData = `https://geo.datav.aliyun.com/areas_v3/bound/${code}.json`
    // jsonData一定要是json数据, Cesium.GeoJsonDataSource.load创建GeoJSON数据源对象
    // const data = await getProvinceBounds(jsonData)
    // const geoJSON = Cesium.GeoJsonDataSource.load(JSON.stringify(data), {
    // stroke: Cesium.Color.fromCssColorString('#FEC602'),
    const geoJSON = Cesium.GeoJsonDataSource.load(jsonData, {
      fill: Cesium.Color.fromCssColorString('#ffffff').withAlpha(0.01)
    }).then((datasource) => { // 加载GeoJson数据源
      const entities = datasource.entities.values
      const obj = {}
      for (let i = 0; i < entities.length; i++) {
        let entity = entities[i]
        // 不添加重复的数据，否则后面removeAll的时候会报错！
        if (!obj[entity.name]) {
          obj[entity.name] = entity
          var positions = entity.polygon.hierarchy._value.positions
          entity.polyline = {
            positions: positions,
            width: 2,
            material: Cesium.Color.fromCssColorString('#FEC602')
          }

          // 将数据源添加到场景中
          viewer.dataSources.add(datasource) // 加载这个geojson资源
        }
      }
      let viewHeight = 1100000
      if (code.slice(2, 4) !== '00') {
        viewHeight = 500000
      }
      if (code.slice(4, 6) !== '00') {
        viewHeight = 80000
      }
      const entity = obj[Object.keys(obj)[0]]
      const cp = entity?.properties?.center
      cp && viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(...cp._value, viewHeight)
      })
    })
  }

  return {
    Cesium,
    echarts,
    viewer,
    initCesium,
    cesiumUseEcharts,
    strokeProvince
  }
}
export default CesiumFun
