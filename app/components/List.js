import React from 'react'

export function List({photographers, removePhotographer, cameras}) {
  return (
    <div className="flex flex-wrap">
      {
        photographers.map((photographer, i) => (
          <div key={i} className="pt4 w-50 pa2">
            <PhotographerItem removePhotographer={removePhotographer} photographer={photographer} cameras={cameras} />
          </div>
        ))
      }
    </div>
  )
}

export function PhotographerItem({photographer, removePhotographer, cameras}) {
  return (
    <div className="shadow-5 pa3 mb3 br1">
      <p className="f3 b">{photographer.name}</p>
      <p className="b">Cameras:</p>
      {photographer.cameras && photographer.cameras.map( (x, i) => {
        return (
          <span className="mr3 pa1 br1 bg-near-white" key={i}>{cameras[parseInt(x) - 1].name}</span>
        )
      })}
      <div className="bd">
        <p className="b dib pr3 pt3">id:</p><span>{photographer.id}</span>
      </div>
      <div className="db">
        <p className="b dib pr3">Email:</p><span>{photographer.email}</span>
      </div>
      <button onClick={() => removePhotographer(photographer.id)} className="mt3 bn db br1 pa2 bg-red white">Remove</button>
    </div>
  )
}
