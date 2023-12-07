import React from "react";
import { AddPlusIcon } from "./AddPlusIcon";
import { ArrowIcon } from "./ArrowIcon";
import { CallIcon } from "./CallIcon";
import { ClientsIcon } from "./ClientsIcon";
import { ClientsMenuIcon } from "./ClientsMenuIcon";
import {WorkbenchIcon} from "./WorkbenchIcon";
import { CloseIcon } from "./CloseIcon";
import { CommonDataIcon } from "./CommonDataIcon";
import { DocumentsIcon } from "./DocumentsIcon";
import { EditIcon } from "./EditIcon";
import { EmailIcon } from "./EmailIcon";
import { HistoryIcon } from "./HistoryIcon";
import { LoginLogo } from "./LoginLogo";
import { Logo } from "./Logo";
import { PasswordIcon } from "./PasswordIcon";
import { PlanningIcon } from "./PlanningIcon";
import { ProccessingIcon } from "./ProccessingIcon";
import { ProductMenuIcon } from "./ProductMenuIcon";
import { SaveMoveIcon } from "./SaveMoveIcon";
import { TelebonTicketIcon } from "./TelebonTicketIcon";
import { UserIcon } from "./UserIcon";
import { ProductIcon } from "./ProductIcon";
import {LogoFirstIcon} from "./LogoFirstIcon";


import {MessengerIcon} from "./MessengerIcon";

import {LeftArrowWithStand} from "./LeftArrowWithStand";
import {MessageIcon} from "./MessageIcon";

import {ConditionsIcon} from "./ConditionsIcon";
import {ConfidentialityIcon} from "./ConfidentialityIcon";
import { Filial } from "./Filial";
import { Phone } from "./Phone";
import { Address } from "./Address";

import {SupportIcon} from "./SupportIcon";
import {AvitoIcon} from "./social/AvitoIcon";
import {VkIcon} from "./social/VkIcon";
import {ViberIcon} from "./social/ViberIcon";
import {TelegramIcon} from "./social/TelegramIcon";
import {PostIcon} from "./social/PostIcon";
import {WhatsUpIcon} from "./social/WhatsUpIcon";
import {QuestionIcon} from "./QuestionIcon";
import {MessageFieldArrowIcon} from "./MessageFieldArrowIcon";
import {StapleIcon} from "./StapleIcon";
import {ScriptIcon} from "./SctiptIcon";
import {ExclamationIcon} from "./ExclamationIcon";
import {Analytics} from "./Analytics";
import {ReportIcon} from "./ReportIcon";
import {AdminIcon} from './AdminIcon'
import {CalendarIcon} from './CalendarIcon'

import {LoggedExitIcon} from "./logged-menu/LoggedExitIcon";
import {LoggedUserIcon} from "./logged-menu/LoggedUserIcon";
import {LoggedPortalIcon} from "./logged-menu/LoggedPortalIcon";
import {LoggedSettingIcon} from "./logged-menu/LoggedSettingIcon";
import {LoggedTarifIcon} from "./logged-menu/LoggedTarifIcon";
import {EntryIcon} from "./EntryIcon";

export enum EIcons {
  logo,
  logofirst,
  loggedexit,
  loggeduser,
  loggedportal,
  loggedsettings,
  loggedtarif,
  entry,
  support,
  conditions,
  confidentiality,
  calendar,
  report,
  close,
  admin,
  scriptbutton,
  exclamation,
  postsocial,
  avitosocial,
  vksocial,
  vibersocial,
  telegramsocial,
  whatsupsocial,

  email,
  login,
  password,
  telebonticket,
  edit,
  user,
  client,
  clientIcon,
  productIcon,
  product,
  processing,
  addplus,
  arrow,
  savemove,
  history,
  commondata,
  documents,
  planning,
  call,

  workbench,
  leftarrowwithstand,
  message,
  messanger,
  filial,
  phone,
  address,
  staple,
  question,
  chatarrow,
  analytics


}

const ICONS: Record<EIcons, any> = {
  [EIcons.logo]: Logo,
  [EIcons.logofirst]: LogoFirstIcon,
  [EIcons.loggedexit]: LoggedExitIcon,
  [EIcons.loggedportal]: LoggedPortalIcon,
  [EIcons.loggedsettings]: LoggedSettingIcon,
  [EIcons.loggedtarif]: LoggedTarifIcon,
  [EIcons.loggeduser]: LoggedUserIcon,
  [EIcons.entry]: EntryIcon,
  [EIcons.conditions]: ConditionsIcon,
  [EIcons.confidentiality]: ConfidentialityIcon,
  [EIcons.support]: SupportIcon,
  [EIcons.calendar]: CalendarIcon,
  [EIcons.report]: ReportIcon,
  [EIcons.admin]: AdminIcon,
  [EIcons.close]: CloseIcon,
  [EIcons.scriptbutton]: ScriptIcon,
  [EIcons.exclamation]: ExclamationIcon,
  [EIcons.avitosocial]: AvitoIcon,
  [EIcons.postsocial]: PostIcon,
  [EIcons.telegramsocial]: TelegramIcon,
  [EIcons.vibersocial]: ViberIcon,
  [EIcons.vksocial]: VkIcon,
  [EIcons.whatsupsocial]: WhatsUpIcon,
  [EIcons.email]: EmailIcon,
  [EIcons.login]: LoginLogo,
  [EIcons.password]: PasswordIcon,
  [EIcons.telebonticket]: TelebonTicketIcon,
  [EIcons.edit]: EditIcon,
  [EIcons.user]: UserIcon,
  [EIcons.client]: ClientsIcon,
  [EIcons.clientIcon]: ClientsMenuIcon,
  [EIcons.productIcon]: ProductMenuIcon,
  [EIcons.product]: ProductIcon,
  [EIcons.processing]: ProccessingIcon,
  [EIcons.addplus]: AddPlusIcon,
  [EIcons.arrow]: ArrowIcon,
  [EIcons.savemove]: SaveMoveIcon,
  [EIcons.history]: HistoryIcon,
  [EIcons.commondata]: CommonDataIcon,
  [EIcons.documents]: DocumentsIcon,
  [EIcons.planning]: PlanningIcon,
  [EIcons.call]: CallIcon,
  [EIcons.workbench]: WorkbenchIcon,
  [EIcons.leftarrowwithstand]: LeftArrowWithStand,
  [EIcons.message]: MessageIcon,
  [EIcons.filial]: Filial,
  [EIcons.phone]: Phone,
  [EIcons.address]: Address,
  [EIcons.messanger]: MessengerIcon,
  [EIcons.question]: QuestionIcon,
  [EIcons.chatarrow]: MessageFieldArrowIcon,
  [EIcons.staple]: StapleIcon,
  [EIcons.analytics]: Analytics
};
interface IIconProps {
  name: EIcons;
}

export function Icon(props: IIconProps) {
  const { name } = props;

  const ChosenIcon = ICONS[name];
  return <ChosenIcon />;
}