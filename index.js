const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const conjuntos = []; /* variable global de almacenamiento  */
  const page = await browser.newPage();
  for (let i = 0; i <= 91; i++) {
    const url = `https://socialasturias.asturias.es/buscador-de-recursos-informaci%C3%B3n?p_p_id=pa_socialasturias_buscador_recursos_SocialasturiasBuscadorRecursosPortlet_INSTANCE_fvYvdJNNCHqD&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_pa_socialasturias_buscador_recursos_SocialasturiasBuscadorRecursosPortlet_INSTANCE_fvYvdJNNCHqD_concejoSelect=0&_pa_socialasturias_buscador_recursos_SocialasturiasBuscadorRecursosPortlet_INSTANCE_fvYvdJNNCHqD_ambitoSelect=0&_pa_socialasturias_buscador_recursos_SocialasturiasBuscadorRecursosPortlet_INSTANCE_fvYvdJNNCHqD_tipoSelect=0&_pa_socialasturias_buscador_recursos_SocialasturiasBuscadorRecursosPortlet_INSTANCE_fvYvdJNNCHqD_areaSelect=0&_pa_socialasturias_buscador_recursos_SocialasturiasBuscadorRecursosPortlet_INSTANCE_fvYvdJNNCHqD_cur=${i}`;
    await page.goto(url);
    //await page.screenshot({ path: "residencias.jpg" });

    //await page.type('#_pa_socialasturias_buscador_recursos_SocialasturiasBuscadorRecursosPortlet_INSTANCE_fvYvdJNNCHqD_searchText', 'mieres')

    //await page.click('#_pa_socialasturias_buscador_recursos_SocialasturiasBuscadorRecursosPortlet_INSTANCE_fvYvdJNNCHqD_searchButton')

    //await page.waitFor(8000); /* temporizador comprobar  */

    // page.screenshot({path: 'residencias2.jpg'});

    /* 2 */
    const enlaces = await page.evaluate(() => {
      const elements = document.querySelectorAll(".mas-informacion-link a");

      const links = [];
      for (const element of elements) {
        links.push(element.href);
      }
      return links;
    });

    console.log(enlaces.length);

    const URL = [];
    for (const enlace of enlaces) {
      const tmp = {};
      tmp.url = enlace;
      //console.log(enlace);
    }

    //console.log(URL);

    //const conjuntos = []

    for (let enlace of enlaces) {
      await page.goto(enlace);
      await page.waitForSelector(".caracteristicas div");

      const conjunto = await page.evaluate(() => {
        const tmp2 = {};

        /* cuadros de la izquierda */
        if (document.querySelector(".caracteristicas .col-md-4 div")) {
          tmp2.area = document.querySelector(
            ".caracteristicas .col-md-4 div"
          ).innerText;
        } else {
          tmp2.area = "";
        }

        if (document.querySelector(".caracteristicas div:nth-child(2)")) {
          tmp2.concejo = document.querySelector(
            ".caracteristicas div:nth-child(2)"
          ).innerText;
        } else {
          tmp2.concejo = "";
        }

        if (document.querySelector(".caracteristicas div:nth-child(3)")) {
          tmp2.especializacion= document.querySelector(".caracteristicas div:nth-child(3)").innerText;
        } else {
          tmp2.especializacion = "";
        }

        if (document.querySelector(".caracteristicas div:nth-child(4)")) {
          tmp2.tipo = document.querySelector(".caracteristicas div:nth-child(4)").innerText;
        } else {
          tmp2.tipo = "";
        }

        /* información de la derecha */

        if (document.querySelector(".page-h1 span")) {
          tmp2.nombre = document.querySelector(".page-h1 span").innerText;
        } else {
          tmp2.nombre = "";
        }

        if (document.querySelector(".col-md-6 .descripcion-recurso div")) {
          tmp2.asociacion = document.querySelector(
            ".col-md-6 .descripcion-recurso div"
          ).innerText;
        } else {
          tmp2.asociacion = "";
        }

        if (document.querySelector(
          ".col-md-6 .descripcion-recurso div:nth-child(2)"
        )) {
          tmp2.direccion = document.querySelector(
            ".col-md-6 .descripcion-recurso div:nth-child(2)"
          ).innerText;
        } else {
          tmp2.direccion = "";
        }

        if (document.querySelector(
          ".col-md-6 .descripcion-recurso div:nth-child(3)"
        )) {
          tmp2.lugar = document.querySelector(
            ".col-md-6 .descripcion-recurso div:nth-child(3)"
          ).innerText;
        } else {
          tmp2.lugar = "";
        }

        if (
          document.querySelector(
            ".col-md-6 .descripcion-recurso div:nth-child(4)"
          )
        ) {
          tmp2.telefono = document.querySelector(
            ".col-md-6 .descripcion-recurso div:nth-child(4)"
          ).innerText;
        } else {
          tmp2.telefono = "";
        }

        if (document.querySelector(
          ".col-md-6 .descripcion-recurso div:nth-child(5)"
        )) {
          tmp2.correo = document.querySelector(
            ".col-md-6 .descripcion-recurso div:nth-child(5)"
          ).innerText;
        } else {
          tmp2.correo = "";
        }

        /* aqui empèzo  el desastre*/
        if (
          document.querySelector(
            ".col-md-6 .descripcion-recurso div:nth-child(6)"
          )
        ) {
          tmp2.web = document.querySelector(
            ".col-md-6 .descripcion-recurso div:nth-child(6)"
          ).innerText;
        } else {
          tmp2.web = "";
        }

        if (
          document.querySelector(
            ".col-md-6 .descripcion-recurso div:nth-child(7)"
          )
        ) {
          tmp2.num_registro = document.querySelector(
            ".col-md-6 .descripcion-recurso div:nth-child(7)"
          ).innerText;
        } else {
          tmp2.num_registro = "";
        }

        if (
          document.querySelector(
            ".col-md-6 .descripcion-recurso div:nth-child(8)"
          )
        ) {
          tmp2.numplazas = document.querySelector(
            ".col-md-6 .descripcion-recurso div:nth-child(8)"
          ).innerText;
        } else {
          tmp2.numplazas = "";
        }

        if (
          document.querySelector(
            ".col-md-6 .descripcion-recurso div:nth-child(9)"
          )
        ) {
          tmp2.plazas_concertadas = document.querySelector(
            ".col-md-6 .descripcion-recurso div:nth-child(9)"
          ).innerText;
        } else {
          tmp2.plazas_concertadas = "";
        }

        if (
          document.querySelector(
            ".col-md-6 .descripcion-recurso div:nth-child(10)"
          )
        ) {
          tmp2.personas_espera = document.querySelector(
            ".col-md-6 .descripcion-recurso div:nth-child(10)"
          ).innerText;
        } else {
          tmp2.personas_espera = "";
        }

        if (
          document.querySelector(
            ".col-md-6 .descripcion-recurso div:nth-child(11)"
          )
        ) {
          tmp2.preciomedio = document.querySelector(
            ".col-md-6 .descripcion-recurso div:nth-child(11)"
          ).innerText;
        } else {
          tmp2.preciomedio = "";
        }
        // tmp2.numPlazas = document.querySelector(".col-md-6 .descripcion-recurso div:last-child").innerText;

        /* coordenadas */

        tmp2.coordenadas = document
          .querySelector(".mapa-google iframe")
          .getAttribute("src");

        // mapa-google

        return tmp2;
      });
      conjuntos.push(conjunto);
    }
  }
  console.log(conjuntos); //

  const datosAlmacenados = JSON.stringify(conjuntos);
  /* guardar datos en .json */
  fs.writeFile("todo.json", datosAlmacenados, (error) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(
      "Los datos han sido almacenados en el archivo centrosSociales.json"
    );
  });

  await browser.close();
})();
