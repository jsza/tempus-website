import React from 'react'

import P from 'prop-types'
import IP from 'react-immutable-proptypes'

import {Form} from 'react-advanced-form'
import TFIcon from 'root/components/TFIcon'
import Input from 'root/components/Input'
import DemoInput from './components/DemoInput'
import PlayerSelectionInput from './components/PlayerSelectionInput'
import StaticFormControl from 'root/components/StaticFormControl'
import FormGroupHorizontal from 'root/components/FormGroupHorizontal'

import {prettyZoneName} from 'root/utils/TempusUtils'
import {CLASSINDEX_TO_NAME} from 'root/constants/TFClasses'


const sampleDemo = {
  expired: false,
  mapname: 'jump_neptune_rc1',
  filename: 'auto-20180511-035332-jump_neptune_rc1',
  uploader_id: null,
  requested: false,
  date: 1526010812.63222,
  url: null,
  recording: true,
  server_id: 10,
  deleted: false,
  id: 646202,
  server_info: {
    hidden: false,
    addr: 'au1-2.tempus.xyz',
    country: 'Australia',
    id: 1,
    shortname: 'AU1',
    port: 27015,
    name: 'Jump (AU) Beginner'
  }
}


const rules =
  { name:
    { startTick: ({ value }) => value.length > 6
    }
  }


const messages =
  { general:
    { missing: 'Please provide the required field.'
    }
  , name:
    { startTick:
      { missing: 'Yep'
      , invalid: 'Please enter a number.'
      }
    }
  }


export default function AddRunForm({ zoneInfo, mapInfo, playerClass }) {
  const {type, zoneindex, custom_name} = zoneInfo.toJS()
  const zoneName = prettyZoneName(type, zoneindex, custom_name)
  return (
    <Form className="run-form form-horizontal" messages={messages} rules={rules}>
      <StaticFormControl label="Zone">
        {mapInfo.get('name')}/{zoneName}
      </StaticFormControl>
      <FormGroupHorizontal label="Player">
        <PlayerSelectionInput />
      </FormGroupHorizontal>
      <StaticFormControl label="Class">
        <TFIcon size="auto" tfClass={playerClass} /> {CLASSINDEX_TO_NAME[playerClass]}
      </StaticFormControl>
      <div className="form-row">
        <div className="col">
          <DemoInput
            name="demoID"
            required
            selectedDemo={sampleDemo}
          />
        </div>
      </div>
      <Input
        required
        name="startTick"
        label="Start"
        type="text"
        placeholder="Start tick"
      />
      <Input
        required
        name="endTick"
        label="End"
        type="text"
        placeholder="End tick"
        rule={/^\d+/}
      />

      {/* <FormGroupHorizontal label="CPs"> */}
      {/*   {['C1', 'C2', 'C3', 'C4', 'C5', 'C6'].map((z, idx) => */}
      {/*     <FormGroupHorizontal key={idx} label={z}> */}
      {/*       <div className="input-group"> */}
      {/*         <input type="text" className="form-control" placeholder="Tick" /> */}
      {/*         <span className="input-group-addon"> */}
      {/*           <span className="text-muted">optional</span> */}
      {/*         </span> */}
      {/*       </div> */}
      {/*     </FormGroupHorizontal> */}
      {/*   )} */}
      {/* </FormGroupHorizontal> */}

    </Form>
  )
}
