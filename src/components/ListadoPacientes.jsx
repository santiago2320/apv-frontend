import { useState } from "react";
import usePaciente from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const { pacientes } = usePaciente();
  const elementosPagina = 2;
  const [paginaActual, setPaginaActual] = useState(1);

  const indiceInico = (paginaActual - 1) * elementosPagina;
  const indiceFin = paginaActual * elementosPagina;

  const pacientesPaginaActual = pacientes.slice(indiceInico, indiceFin);

  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center"> Listado Pacientes</h2>

          <p className="text-xl my-5 mb-5 text-center">
            Administra tus {""}
            <span className="text-indigo-600 font-bold">Pacientes y citas</span>
          </p>

          {pacientesPaginaActual.map((paciente,index) => (
            <Paciente key={paciente._id || index} paciente={paciente} />
          ))}

              <div className="flex justify-between items-center mx-5">
                <button
                  className="bg-indigo-500 px-5 py-3 text-white rounded-md"
                  disabled={Boolean(paginaActual === 1)}
                  onClick={() => setPaginaActual(paginaActual - 1)}
                >
                  {"<"}Anterior
                </button>

                <span className="font-bold">Pagina {paginaActual}</span>

                <button
                  className="bg-indigo-500 px-5 py-3 text-white rounded-md"
                  disabled={indiceFin >= pacientes.length}
                  onClick={() => setPaginaActual(paginaActual + 1)}
                >
                  Siguiente{">"}
                </button>
              </div>
        </>
      ) : (
            <>
              <h2 className="font-black text-3xl text-center"> No Hay Pacientes</h2>
              <p className="text-xl my-5 mb-5 text-center">
                Agregar Pacientes {""}
                <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
              </p>
            </>
          )}
      
    </>
  );
};

export default ListadoPacientes;
