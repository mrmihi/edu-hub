import { FooterComponent } from 'flowbite-react';

const Footer = () => {
  return (
    <FooterComponent container={true}>
      <FooterComponent.Copyright href="#" by="Arachnophobia" year={2023} />
      <FooterComponent.LinkGroup>
        <FooterComponent.Link href="/">Home</FooterComponent.Link>
        <FooterComponent.Link href="/contact">Contact</FooterComponent.Link>
      </FooterComponent.LinkGroup>
    </FooterComponent>
  );
};

export default Footer;
