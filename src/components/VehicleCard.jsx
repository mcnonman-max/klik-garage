import { useNavigate } from 'react-router-dom'
import {
  IconCar,
  IconDotsVertical,
  IconMountain,
  IconShieldCheck,
  IconShieldExclamation,
  IconShieldX,
  IconParking,
  IconRoad,
  IconSun,
} from '@tabler/icons-react'
import PlateBadge from './PlateBadge'
import StatusChip from './StatusChip'
import { getBrandLogo } from '../data/brandLogos'
import { getStatus, getWorstStatus, statusText } from '../utils/dateStatus'
import { vignetteCountText } from '../utils/plural'
import { getTireSeasonStatus } from '../utils/tireSeason'
import { useVehicles } from '../state/VehiclesContext'

const insuranceIcons = {
  unset: IconShieldCheck,
  ok: IconShieldCheck,
  warning: IconShieldExclamation,
  critical: IconShieldX,
}
const parkingIcons = { unset: IconParking, ok: IconParking, warning: IconParking, critical: IconParking }
const vignetteIcons = { unset: IconRoad, ok: IconRoad, warning: IconRoad, critical: IconRoad }

const STK_LABELS = {
  ok: 'STK platná',
  warning: 'STK blíží se konec',
  critical: 'STK neplatná',
}

// Icon always matches the target/current season itself (never the state),
// per spec: "ikona vždy odpovídá cílové sezóně, ne sezóně ze které se odchází".
const TIRE_ICONS = { summer: IconSun, winter: IconMountain }
const TIRE_OK_TEXT = { winter: 'Zimní pneumatiky', summer: 'Letní pneumatiky' }

export default function VehicleCard({ vehicle }) {
  const navigate = useNavigate()
  const { confirmTireSwap } = useVehicles()
  const logo = getBrandLogo(vehicle)

  const vignettes = vehicle.vignettes ?? []
  const vignetteStatus = getWorstStatus(vignettes.map((v) => v.date))
  const vignetteText =
    vignettes.length === 0
      ? 'Nenastaveno'
      : vignettes.length === 1
        ? statusText(vignettes[0].date)
        : vignetteCountText(vignettes.length)

  const stkDate = vehicle.stk?.date
  const stkStatus = stkDate ? getStatus(stkDate) : null

  const tireStatus = vehicle.tires === 'seasonal' ? getTireSeasonStatus(vehicle.tireSwapConfirmedFor) : null
  const TireIcon = tireStatus ? TIRE_ICONS[tireStatus.tireType] : null
  const tireText = tireStatus
    ? tireStatus.state === 'warning'
      ? 'Blíží se přezutí'
      : TIRE_OK_TEXT[tireStatus.tireType]
    : null

  return (
    <div className="glass vehicle-card">
      <div className="vehicle-card-top">
        <div className="vehicle-card-id">
          <div className="vehicle-icon-sq">
            {logo ? (
              <img src={logo} alt="" className="vehicle-brand-logo" />
            ) : (
              <IconCar size={20} stroke={1.8} />
            )}
          </div>
          <div style={{ minWidth: 0 }}>
            <div className="vehicle-name-row">
              <p className="vehicle-name">{vehicle.name}</p>
              {stkStatus && <span className={`stk-badge stk-${stkStatus}`}>{STK_LABELS[stkStatus]}</span>}
            </div>
            <PlateBadge plate={vehicle.plate} />
          </div>
        </div>
        <button
          className="options-btn"
          type="button"
          aria-label="Upravit vozidlo"
          onClick={() => navigate(`/vozidlo/${vehicle.id}/upravit`)}
        >
          <IconDotsVertical size={17} stroke={1.8} />
        </button>
      </div>

      <div className="chip-row">
        <StatusChip
          label="Pojištění"
          icon={insuranceIcons}
          date={vehicle.insurance?.date}
          onClick={() => navigate(`/vozidlo/${vehicle.id}/pojisteni`)}
        />
        <StatusChip
          label="Parkování"
          icon={parkingIcons}
          date={vehicle.parking?.date}
          onClick={() => navigate(`/vozidlo/${vehicle.id}/parkovani`)}
        />
        <StatusChip
          label="Známka"
          icon={vignetteIcons}
          status={vignetteStatus}
          text={vignetteText}
          onClick={() => navigate(`/vozidlo/${vehicle.id}/znamka`)}
        />
      </div>

      {tireStatus && (
        <div className={`tire-alert tire-${tireStatus.state}`}>
          <div className="tire-alert-row">
            <TireIcon size={16} stroke={2} />
            <span className="tire-alert-text">{tireText}</span>
          </div>
          {tireStatus.state === 'warning' && (
            <button
              className="tire-confirm-btn"
              type="button"
              onClick={() => confirmTireSwap(vehicle.id, tireStatus.anchorKey)}
            >
              Přezuto
            </button>
          )}
        </div>
      )}
    </div>
  )
}
