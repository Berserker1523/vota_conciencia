import React from "react";
import PropTypes from "prop-types";

const Comentario = props => {
  return (
    <div>
      <h5 className="comentarioUsuario">{props.comentario.nombreUsuario}</h5>
      <p>{props.comentario.texto}</p>
    </div>
  );
};

Comentario.propTypes = {
  comentario: PropTypes.object.isRequired
};

export default Comentario;
