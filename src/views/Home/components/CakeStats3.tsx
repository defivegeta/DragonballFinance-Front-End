import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply3, useBurnedBalance3 } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCake3Address } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms3, usePrice3CakeBusd } from '../../../state/hooks'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeStats3 = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply3()
  const burnedBalance = useBurnedBalance3(getCake3Address())
  const farms = useFarms3();
  const eggPrice = usePrice3CakeBusd();
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const marketCap = eggPrice.times(circSupply);

  let DragonBallPerBlock = 0;
  if(farms && farms[0] && farms[0].DragonBallPerBlock){
    DragonBallPerBlock = new BigNumber(farms[0].DragonBallPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(5340, 'SL1 Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(5360, 'Total SL1 Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(5360, 'SL1 Price')}</Text>
          <CardValue fontSize="14px" value={eggPrice.toNumber()} decimals={2} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(9990, 'SL1 Market Cap')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(5380, 'Total SL1 Burned')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(5400, 'New SL1/block')}</Text>
          <Text bold fontSize="14px">{DragonBallPerBlock}</Text>
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats3
