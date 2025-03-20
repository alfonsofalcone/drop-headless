import type { Schema, Struct } from '@strapi/strapi';

export interface AttributesSeo extends Struct.ComponentSchema {
  collectionName: 'components_attributes_seos';
  info: {
    displayName: 'Seo';
  };
  attributes: {
    seoImages: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    seoMetaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 170;
      }>;
    seoMetaTitle: Schema.Attribute.String;
    seoUrl: Schema.Attribute.String;
  };
}

export interface ComponentsButton extends Struct.ComponentSchema {
  collectionName: 'components_components_buttons';
  info: {
    description: '';
    displayName: 'Button';
  };
  attributes: {
    buttonBgColor: Schema.Attribute.Enumeration<
      ['default', 'primary', 'secondary']
    >;
    buttonLink: Schema.Attribute.String;
    buttonTag: Schema.Attribute.Enumeration<['button', 'a']> &
      Schema.Attribute.DefaultTo<'button'>;
    buttonText: Schema.Attribute.String;
    buttonType: Schema.Attribute.Enumeration<
      ['link', 'button', 'button-small', 'view-all']
    >;
    targetBlank: Schema.Attribute.Boolean;
  };
}

export interface ComponentsCaseCard extends Struct.ComponentSchema {
  collectionName: 'components_components_case_cards';
  info: {
    description: '';
    displayName: 'Case Card';
  };
  attributes: {
    caseImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    caseImageHPosition: Schema.Attribute.Integer;
    caseImageVPosition: Schema.Attribute.Integer;
    caseName: Schema.Attribute.String;
    caseUrl: Schema.Attribute.String;
  };
}

export interface ComponentsGoal extends Struct.ComponentSchema {
  collectionName: 'components_components_goals';
  info: {
    displayName: 'Goal';
  };
  attributes: {
    goalDescription: Schema.Attribute.String;
  };
}

export interface ComponentsHeroCard extends Struct.ComponentSchema {
  collectionName: 'components_components_hero_cards';
  info: {
    description: '';
    displayName: 'Hero Card';
  };
  attributes: {
    heroCardLink: Schema.Attribute.String;
    heroCardText: Schema.Attribute.String;
    heroCardTitle: Schema.Attribute.String;
  };
}

export interface ComponentsLogoItem extends Struct.ComponentSchema {
  collectionName: 'components_components_logo_items';
  info: {
    displayName: 'Logo Item';
  };
  attributes: {
    logoImage: Schema.Attribute.Media<'images' | 'files'>;
    logoImageAlt: Schema.Attribute.String;
  };
}

export interface ComponentsTag extends Struct.ComponentSchema {
  collectionName: 'components_components_tags';
  info: {
    displayName: 'Tag';
  };
  attributes: {
    tagLink: Schema.Attribute.String;
    tagText: Schema.Attribute.String;
    tagType: Schema.Attribute.Enumeration<['button', 'a']>;
  };
}

export interface FooterFooterLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_link_items';
  info: {
    description: '';
    displayName: 'Footer Link Item';
  };
  attributes: {
    footerLinkText: Schema.Attribute.String;
    footerLinkUrl: Schema.Attribute.String;
    isBlank: Schema.Attribute.Boolean;
  };
}

export interface FooterFooterMenu extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_menus';
  info: {
    description: '';
    displayName: 'Footer Menu';
  };
  attributes: {
    footerLinkItems: Schema.Attribute.Component<
      'footer.footer-link-item',
      true
    >;
    footerMenuTitle: Schema.Attribute.String;
    footerSublinkItems: Schema.Attribute.Component<
      'footer.footer-sublink-item',
      true
    >;
  };
}

export interface FooterFooterNewsletter extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_newsletters';
  info: {
    displayName: 'Footer Newsletter';
  };
  attributes: {
    footerNewsletterButton: Schema.Attribute.Component<
      'components.button',
      false
    >;
    footerNewsletterText: Schema.Attribute.String;
    footerNewsletterTitle: Schema.Attribute.String;
  };
}

export interface FooterFooterSublinkItem extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_sublink_items';
  info: {
    displayName: 'Footer Sublink Item';
  };
  attributes: {
    footerSublinkText: Schema.Attribute.String;
    footerSublinkUrl: Schema.Attribute.String;
    isBlank: Schema.Attribute.Boolean;
  };
}

export interface HeaderMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_header_menu_items';
  info: {
    description: '';
    displayName: 'Menu Items';
  };
  attributes: {
    menuItemName: Schema.Attribute.String;
    subMenuItems: Schema.Attribute.Component<'header.sub-menu-item', true>;
  };
}

export interface HeaderSubMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_header_sub_menu_items';
  info: {
    description: '';
    displayName: 'Sub Menu Items';
  };
  attributes: {
    isFooterItem: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    showMinorLinks: Schema.Attribute.Boolean;
    subMenuBgColor: Schema.Attribute.Enumeration<['white', 'yellow']>;
    subMenuItemName: Schema.Attribute.String & Schema.Attribute.Required;
    subMenuLinks: Schema.Attribute.Component<'header.sub-menu-link', true>;
    subMenuMinorLinks: Schema.Attribute.Component<
      'header.sub-menu-minor-link',
      true
    >;
  };
}

export interface HeaderSubMenuLink extends Struct.ComponentSchema {
  collectionName: 'components_header_sub_menu_links';
  info: {
    displayName: 'Sub Menu Link';
  };
  attributes: {
    subMenuLinkTitle: Schema.Attribute.String;
    subMenuLinkUrl: Schema.Attribute.String;
  };
}

export interface HeaderSubMenuMinorLink extends Struct.ComponentSchema {
  collectionName: 'components_header_sub_menu_minor_links';
  info: {
    displayName: 'Sub Menu Minor Link';
  };
  attributes: {
    subMenuMinorLinkTitle: Schema.Attribute.String;
    subMenuMinorLinkUrl: Schema.Attribute.String;
  };
}

export interface SectionsCarouselLogos extends Struct.ComponentSchema {
  collectionName: 'components_sections_carousel_logos';
  info: {
    description: '';
    displayName: 'Carousel Logos';
  };
  attributes: {
    logoItems: Schema.Attribute.Component<'components.logo-item', true>;
    showCarousel: Schema.Attribute.Boolean;
  };
}

export interface SectionsCaseDetails extends Struct.ComponentSchema {
  collectionName: 'components_sections_case_details';
  info: {
    description: '';
    displayName: 'Case Details';
  };
  attributes: {
    sectionBgColor: Schema.Attribute.String;
    sectionButtons: Schema.Attribute.Component<'components.button', true>;
    sectionContent: Schema.Attribute.Blocks;
    sectionStyledTextColor: Schema.Attribute.Enumeration<
      ['White', 'Silver', 'Black']
    > &
      Schema.Attribute.DefaultTo<'Black'>;
    sectionTags: Schema.Attribute.Component<'components.tag', true>;
    sectionTextColor: Schema.Attribute.String;
    sectionTitle: Schema.Attribute.Blocks;
  };
}

export interface SectionsCases extends Struct.ComponentSchema {
  collectionName: 'components_sections_cases';
  info: {
    description: '';
    displayName: 'Cases';
  };
  attributes: {
    caseCards: Schema.Attribute.Component<'components.case-card', true>;
    casesGoTo: Schema.Attribute.Component<'components.button', false>;
    casesLimit: Schema.Attribute.Integer;
    casesTitleSection: Schema.Attribute.String;
  };
}

export interface SectionsFullImage extends Struct.ComponentSchema {
  collectionName: 'components_sections_full_images';
  info: {
    description: '';
    displayName: 'Full Image';
  };
  attributes: {
    desktopImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    hasButton: Schema.Attribute.Boolean;
    mobileImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    sectionButton: Schema.Attribute.Component<'components.button', false>;
  };
}

export interface SectionsGoalsList extends Struct.ComponentSchema {
  collectionName: 'components_sections_goals_lists';
  info: {
    description: '';
    displayName: 'Goals List';
  };
  attributes: {
    sectionBgColor: Schema.Attribute.String;
    sectionContent: Schema.Attribute.Blocks;
    sectionGoals: Schema.Attribute.Component<'components.goal', true>;
    sectionStyledTextColor: Schema.Attribute.Enumeration<
      ['White', 'Silver', 'Black']
    >;
    sectionTextColor: Schema.Attribute.String;
    sectionTitle: Schema.Attribute.Blocks;
  };
}

export interface SectionsHeading extends Struct.ComponentSchema {
  collectionName: 'components_sections_headings';
  info: {
    displayName: 'Heading';
  };
  attributes: {
    headingColor: Schema.Attribute.String;
    headingTitle: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    description: '';
    displayName: 'Hero';
  };
  attributes: {
    heroBgHasOverlay: Schema.Attribute.Boolean;
    heroBgImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    heroBgOverlayColor: Schema.Attribute.String;
    heroBgOverlayOpacity: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    heroCards: Schema.Attribute.Component<'components.hero-card', true>;
    heroCardsTitle: Schema.Attribute.String;
    heroText: Schema.Attribute.String;
    heroTitle: Schema.Attribute.String;
  };
}

export interface SectionsTags extends Struct.ComponentSchema {
  collectionName: 'components_sections_tags';
  info: {
    displayName: 'Tags';
  };
  attributes: {
    sectionTags: Schema.Attribute.Component<'components.tag', true>;
  };
}

export interface SectionsText extends Struct.ComponentSchema {
  collectionName: 'components_sections_texts';
  info: {
    description: '';
    displayName: 'Text';
  };
  attributes: {
    sectionBgColor: Schema.Attribute.String;
    sectionButtons: Schema.Attribute.Component<'components.button', true>;
    sectionContent: Schema.Attribute.Blocks;
    sectionStyledTextColor: Schema.Attribute.Enumeration<
      ['White', 'Silver', 'Black']
    > &
      Schema.Attribute.DefaultTo<'Black'>;
    sectionTags: Schema.Attribute.String;
    sectionTextColor: Schema.Attribute.String;
    sectionTitle: Schema.Attribute.Blocks;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'attributes.seo': AttributesSeo;
      'components.button': ComponentsButton;
      'components.case-card': ComponentsCaseCard;
      'components.goal': ComponentsGoal;
      'components.hero-card': ComponentsHeroCard;
      'components.logo-item': ComponentsLogoItem;
      'components.tag': ComponentsTag;
      'footer.footer-link-item': FooterFooterLinkItem;
      'footer.footer-menu': FooterFooterMenu;
      'footer.footer-newsletter': FooterFooterNewsletter;
      'footer.footer-sublink-item': FooterFooterSublinkItem;
      'header.menu-item': HeaderMenuItem;
      'header.sub-menu-item': HeaderSubMenuItem;
      'header.sub-menu-link': HeaderSubMenuLink;
      'header.sub-menu-minor-link': HeaderSubMenuMinorLink;
      'sections.carousel-logos': SectionsCarouselLogos;
      'sections.case-details': SectionsCaseDetails;
      'sections.cases': SectionsCases;
      'sections.full-image': SectionsFullImage;
      'sections.goals-list': SectionsGoalsList;
      'sections.heading': SectionsHeading;
      'sections.hero': SectionsHero;
      'sections.tags': SectionsTags;
      'sections.text': SectionsText;
    }
  }
}
