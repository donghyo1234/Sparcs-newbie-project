import React from "react";
import styled from "styled-components";
import DefaultLayout from "../layouts/DefaultLayout";
import { Spacer } from "../components/utils/Spacer";
import { MainBanner } from "../features/landing/frames/MainBanner";
import { MainLinkSection } from "../features/landing/frames/ServiceIntroduction";
import { ResponsiveBodyCallout } from "../components/layout/Body";

const IndexPage = () => {
  console.log("loaded")
  return <DefaultLayout>
    <Spacer height={140}/>
    <MainBanner/>
    <Spacer height={60}/>
    <ResponsiveBodyCallout>
      <MainLinkSection/>
    </ResponsiveBodyCallout>
  </DefaultLayout>
}

export default IndexPage