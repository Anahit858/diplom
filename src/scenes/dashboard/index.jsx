import { Box, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import LineChart from '../../components/LineChart'
import StatBox from '../../components/StatBox'
import Topbar from '../../scenes/global/Topbar'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { dataGlobal } from '../../data/worldGlobalInfo'
import Flag from 'react-flagkit'
import { Abc, Agriculture, Language, LocationCity, Money, Nature } from '@mui/icons-material'
import BarChart from '../../components/BarChart'

const Dashboard = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isSidebar] = useState(true)
  const [countryName, setCountryName] = useState(dataGlobal[0].Country)
  const [country, setCountry] = useState(dataGlobal[0])

  const handleChange = (event) => {
    setCountryName(event.target.value)
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Countries</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={countryName}
              label="country"
              onChange={handleChange}>
              {dataGlobal.map((element) => (
                <MenuItem
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  key={element.Country}
                  value={element.Country}
                  onClick={() => setCountry(element)}>
                  {element.Country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Topbar setIsSidebar={isSidebar} />
      </Box>

      {/* GRID & CHARTS */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          padding={2}>
          <Typography variant="h3" component="h3">
            {country?.Country}
          </Typography>
          <Flag country={country?.Abbreviation} size={60} />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center">
          <Typography variant="h5" component="h3">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Abc
                sx={{ color: colors.greenAccent[600], fontSize: '26px', margin: '2px 10px' }}
                colorInterpolationFilters=""
              />
              Abbreviation: {country?.Abbreviation}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <LocationCity
                sx={{ color: colors.greenAccent[600], fontSize: '26px', margin: '2px 10px' }}
                colorInterpolationFilters=""
              />
              Capital/Major City : {country?.['Capital/Major City']}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Money
                sx={{ color: colors.greenAccent[600], fontSize: '26px', margin: '2px 10px' }}
                colorInterpolationFilters=""
              />
              Currency Code : {country?.['Currency-Code']}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Language
                sx={{ color: colors.greenAccent[600], fontSize: '26px', margin: '2px 10px' }}
                colorInterpolationFilters=""
              />
              Official Language : {country?.['Official language']}
            </div>
          </Typography>
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center">
          <StatBox
            title={'Agricultural Land( %)'}
            progress={(country['Agricultural Land( %)'].replace(/%/g, '') / 100).toFixed(2)}
            increase={country['Agricultural Land( %)']}
            icon={
              <Agriculture
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                colorInterpolationFilters=""
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center">
          <StatBox
            title={'Forested Area (%)'}
            progress={(country['Forested Area (%)'].replace(/%/g, '') / 100).toFixed(2)}
            increase={country['Forested Area (%)']}
            icon={<Nature sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Typography variant="h5" fontWeight="600" sx={{ padding: '30px 30px 0 30px' }}>
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart country={country} isDashboard={true} />
          </Box>
        </Box>
        {/* ROW 2 */}
        <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center">
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Սպառողական գների ինդեքսի փոփոխություն ( նախորդ տարվա համեմատ )
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart country={country} isDashboard={true} />{' '}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
